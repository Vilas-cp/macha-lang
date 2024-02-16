"use client";
import Header from "@/components/Header";
import firebase from "firebase/compat/app";
import { collection, addDoc } from "firebase/compat/firestore";
import { Head } from "next/document";
import { useEffect, useState, useRef } from "react";
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

    setHangupButtonDisabled(false);
  };

  // 3. Answer the call with the unique ID
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
      <div className="antialiased text-center text-gray-700 pt-[80px] mx-4 ">
        <h2>1. Start your Webcam</h2>
        <div className="flex items-center justify-center flex-row">
          <span>
            <h3>Local Stream</h3>
            <video
              ref={webcamVideoRef}
              className="w-40vw h-30vw m-8 bg-blue-700"
              autoPlay
              playsinline
            ></video>
          </span>
          <span>
            <h3>Remote Stream</h3>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsinline
              className="w-40vw h-30vw m-8 bg-blue-800"
            ></video>
          </span>
        </div>

        <button
          onClick={handleWebcamButtonClick}
          className="bg-cyan-700"
          disabled={webcamButtonDisabled}
        >
          Start webcam
        </button>
        <h2>2. Create a new Call</h2>
        <button
          onClick={handleCallButtonClick}
          disabled={callButtonDisabled}
          className="bg-red-700"
        >
          Create Call (offer)
        </button>

        <h2>3. Join a Call</h2>
        <p>Answer the call from a different browser window or device</p>

        <input
          id="callInput"
          value={callInputValue}
          onChange={handleCallInputChange}
          className="bg-gray-200 rounded-l text-black"
        />
        <button
          onClick={handleAnswerButtonClick}
          disabled={answerButtonDisabled}
          className="bg-yellow-300"
        >
          Answer
        </button>

        <h2>4. Hangup</h2>

        <button
          id="hangupButton"
          disabled={hangupButtonDisabled}
          className="bg-green-600"
        >
          Hangup
        </button>
      </div>
    </div>
  );
}
