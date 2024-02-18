"use client";
import Header from "@/components/Header";
import firebase from "firebase/compat/app";

import { useEffect, useState, useRef } from "react";
import "firebase/compat/firestore";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function Home() {
  let [localStream, setLocalStream] = useState(null);
  let [remoteStream, setRemoteStream] = useState(null);
  let [pc, setPC] = useState(null);

  const webcamVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const firestore = useRef(null);

  const [callInputValue, setCallInputValue] = useState("");
  const [webcamButtonDisabled, setWebcamButtonDisabled] = useState(false);
  const [callButtonDisabled, setCallButtonDisabled] = useState(true);
  const [answerButtonDisabled, setAnswerButtonDisabled] = useState(true);
  const [hangupButtonDisabled, setHangupButtonDisabled] = useState(true);
  // const [webcam,setwebcam]=useState(null);
  // const [remotecam,setremotecam]=useState(null);

  const handleCallInputChange = (event) => {
    setCallInputValue(event.target.value);
  };

  useEffect(() => {
    const firebaseConfig = {
      // your config
      apiKey: "AIzaSyABNaUEXR4x46Tc6aGZMwr6gzubSNurL50",
      authDomain: "macha-lang.firebaseapp.com",
      projectId: "macha-lang",
      storageBucket: "macha-lang.appspot.com",
      messagingSenderId: "647804207287",
      appId: "1:647804207287:web:5518a76762969646e40d32",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firestore.current = firebase.firestore();
    const peerConnection = new RTCPeerConnection(servers);
    setPC(peerConnection);

    //setwebcam(webcamVideoRef.current);
    //setremotecam(remoteVideoRef.current);
  }, []);

  // HTML elements

  useEffect(() => {
    const unsubscribe = firestore.current
      .collection("calls")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            setLatestCallDocId(change.doc.id);
          }
        });
      });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [firestore.current]);

  const [latestCallDocId, setLatestCallDocId] = useState("");

  // 1. Setup media sources

  let handleWebcamButtonClick = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(localStream);
    const remoteMediaStream = new MediaStream();
    webcamVideoRef.current.srcObject = localStream;
    remoteVideoRef.current.srcObject = remoteMediaStream;
    setRemoteStream(remoteMediaStream);
    console.log(localStream);

    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        if (remoteVideoRef.current.srcObject.getTracks().length <= 1) {
          console.log(remoteVideoRef.current.srcObject.getTracks());
          remoteVideoRef.current.srcObject.addTrack(track);
        }
      });
    };
    webcamVideoRef.current.muted = true;
    setCallButtonDisabled(false);
    setAnswerButtonDisabled(false);
    setWebcamButtonDisabled(true);
  };

  // 2. Create an offer
  let handleCallButtonClick = async () => {
    // Reference Firestore collections for signaling
    const callDoc = firestore.current.collection("calls").doc();
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    setCallInputValue(callDoc.id);

    // Get candidates for caller, save to db
    pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    // Create offer
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    // Listen for remote answer
    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    // When answered, add candidate to peer connection
    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });

    setHangupButtonDisabled(true);
  };

  // 3. Answer the call with the unique ID
  let handleAnswerButtonClick = async () => {
    const callId = callInputValue;
    const callDoc = firestore.current
      .collection("calls")
      .doc(callId.toString());
    const answerCandidates = callDoc.collection("answerCandidates");
    const offerCandidates = callDoc.collection("offerCandidates");

    pc.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();

    const offerDescription = callData?.offer;
    const remoteDescription = new RTCSessionDescription(offerDescription);
    await pc.setRemoteDescription(remoteDescription);

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      sdp: answerDescription.sdp,
      type: answerDescription.type,
    };

    await callDoc.update({ answer });

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change);
        if (change.type === "added") {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  return (
    <div>
      <Header />
      <div className="antialiased text-center text-gray-700 pt-[80px]  ">
        <h2 className=" font-bold text-[50px]">ONLINE TUTORING</h2>

        <div className="flex items-center justify-center flex-row">
          <span>
            <video
              ref={webcamVideoRef}
              className="w-[40vw] h-[30vw] m-8 bg-gray-900"
              autoPlay
              playsInline
            ></video>
          </span>
          <span>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-[40vw] h-[30vw] m-8 bg-gray-900"
            ></video>
          </span>
        </div>

        <button
          onClick={handleWebcamButtonClick}
          className="bg-[#0070f0] w-[180px] h-[40px] rounded-xl block ml-[140px]"
          disabled={webcamButtonDisabled}
          color="primary"
        >
          <p className="text-white font-semibold"> Start Webcam</p>
        </button>
        <button
          onClick={() => setCallInputValue(latestCallDocId)}
          className="bg-[#9455d3] w-[280px] h-[40px] rounded-xl mt-[5px] mb-[10px]">
          <p className="text-white font-semibold">
            Click to join the latest class
          </p>
        </button>
        <div className="flex justify-center items-center">
          
          <h2 className="inline-block font-semibold text-[30px] pr-[10px] ">
            Ask others to Join:
          </h2>
          <button
            onClick={handleCallButtonClick}
            disabled={callButtonDisabled}
            className="bg-[#9455d3] w-[180px] h-[40px] rounded-xl "
          >
            <p className="text-white font-semibold">Ask for class</p>
          </button>
        </div>
        <h2 className="mb-[4px] font-semibold">or</h2>

        <div className="flex gap-[20px] justify-center">
          <input
            id="callInput"
            value={callInputValue}
            onChange={handleCallInputChange}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="online-class-id"
          />

          <button
            onClick={handleAnswerButtonClick}
            disabled={answerButtonDisabled}
            className="bg-[#0070f0] w-[200px] rounded-xl"
          >
            <p className="text-white font-semibold"> Join class</p>
          </button>
        </div>

        <button
          id="hangupButton"
          disabled={hangupButtonDisabled}
          className="rounded-full pt-[20px]"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/14025/14025253.png"
            width={50}
          />
        </button>
      </div>
    </div>
  );
}
