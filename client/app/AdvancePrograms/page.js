"use client";

import Footer from "@/components/Footer";
import { CopyBlock, dracula } from "react-code-blocks";
import text from "./code";
import text1 from "./linkedlist";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <div>
        <Header />
        <div className="py-[100px] w-full px-[10px] md:px-[100px]">
          <div>
            <h1 className="text-[40px] md:text-[60px] font-bold">
              Linked list
            </h1>
            <h2 className="pt-[20px]">Properties of Binary Search Tree:</h2>
            <ul>
              <li>
                All nodes of the left subtree are less than the root node.
              </li>
              <li>
                All nodes of the right subtree are greater than the root node.
              </li>
              <li>
                Both subtrees of each node are also Binary Search Trees i.e.
                they have the above two properties.
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center flex-col ">
            <img
              src="https://cdn.programiz.com/sites/tutorial2program/files/linked-list-with-data.png"
              alt=""
              width={1000}
            />
            <div className="w-full lg:w-[100vh] h-[70vh] overflow-scroll overflow-x-hidden">
              <CopyBlock text={text1} theme={dracula} codeBlock />
            </div>
          </div>

          <div className="pt-[40px]">
            <div>
              <h1 className="text-[60px] font-bold">Binary Search Tree</h1>
              <h2 className="pt-[20px]">Properties of Binary Search Tree:</h2>

              <li>
                All nodes of the left subtree are less than the root node.
              </li>
              <li>
                All nodes of the right subtree are greater than the root node.
              </li>
              <li>
                Both subtrees of each node are also Binary Search Trees i.e.
                they have the above two properties.
              </li>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col ">
            <img
              src="https://cdn.programiz.com/sites/tutorial2program/files/bst-delete-8.png"
              alt=""
            />
            <div className="w-full lg:w-[100vh] h-[70vh] overflow-scroll overflow-x-hidden">
              <CopyBlock text={text} theme={dracula} codeBlock />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
