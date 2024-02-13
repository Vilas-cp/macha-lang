import Header from "@/components/Header";

let text = [
  {
    Name: "idu",
    Type: "let:The let keyword was introduced in ES6 (2015).Variables declared with let have Block Scope.Variables declared with let must be Declared before use.Variables declared with let cannot be Redeclared in the same scope",
    Description:
      "In Macha lang, variables can be declared using idu. Variables defined with the idu keyword cannot be redeclared and must be declared before use. ",
    Example: "<br/>idu a = 10;<br/>idu b = 15;<br/>",
  },
  {
    Name: "enadre",
    Type: "if:Use if to specify a block of code to be executed, if a specified condition is true.Use else to specify a block of code to be executed, if the same condition is false.Use else if to specify a new condition to test, if the first condition is false.Use switch to specify many alternative blocks of code to be executed",
    Description:
      "Macha lang supports if conditionl statement, enandre block will execute if specified condition is nija. If the condition is sullu, another block of code can be executed.",
    Example: "<br/>enandre(a>10){<br/>print('hello');<br/>}<br/>",
  },
  {
    Name: "illandre",
    Type: "else if",
    Description:
      "Macha lang supports else-if ladder construct. enandre block will execute if condition is nija, otherwise one of the subsequently added illandre blocks will execute if their respective condition is nija.",
    Example:
      "<br/>enandre(a>10){<br/>print('hi');<br/>}<br/>illandre(b>10){</br>print('hello');<br/>}<br/>",
  },
  {
    Name: "illava",
    Type: "else",
    Description:
      "In Macha lang if/else statement and else if ladder construct, if the enandre and illandre block condition is sullu, eventually the illava block get executed",
    Example:
      "<br/>enandre(a>10){<br/>print('hi');<br/>}<br/>illandre(b>10){</br>print('hello');<br/>}<br/>illava {<br/>print('error');<br/>}<",
  },
  {
    Name: "allivargu",
    Type: "for",
    Description:
      "Macha lang supports for control statement. allivargu is used for iterating over a sequence of elements, typically within a specified range. ",
    Example: "<br/>allivargu(i=0;i<=5;i++){<br/>print(i);<br/>}<br/>",
  },
  {
    Name: "allitanka",
    Type: "while:If you forget to increase the variable used in the condition, the loop will never end. This will crash your browser.",
    Description:
      "while conditional loop can be declared in Macha lang by using allitanka. Statements inside allitanka blocks are executed as long as a specified condition evaluates to nija. If the condition becomes sullu, statement within the loop stops executing and control passes to the statement following the loop",
    Example:
      "<br/>idu a = 1;<br/>allitanka(a<=5){<br/>print(a);<br/>a++<br/>}<br/>",
  },
  {
    Name: "kelsa",
    Type: "Function",
    Description:
      "In Macha lang, functions can be defined using kelsa. kelsa is a block of reusable code that performs a specific task. It typically takes input parameters, performs operations, and optionally returns a result.",
    Example: "<br/>kelsa(){<br/>print('hello world');<br/>}<br/>",
  },
  {
    Name: "irlli",
    Type: "const",
    Description:
      "In Macha lang, irlli is a keyword used to declare a variable whose value cannot be changed after it has been initialized. Constants are typically used for values that are intended to remain unchanged throughout the execution of a program, such as mathematical constants or configuration settings. Once a const variable is assigned a value, any attempt to modify it will result in an error",
    Example: "irlli PI=3.14;",
  },
];

export default function Home() {
  let data = text.map((item) => (
    <div className=" h-full w-full hover:hover:bg-[#04AA6D] hover:cursor-pointer">
      <div className="flex justify-center pt-2 items-center "> {item.Name}</div>
    </div>
  ));
  let dataset = text.map((items) => (
    <div className="p-[20px] flex flex-col gap-[30px] ">
      <div className="text-[50px] font-mono font-bold bg-green-500 h-[70px] w-fit">
        {items.Name}
      </div>
     
      <div className="flex justify-center">
        <div className=" bg-[#D9EEE1!important]  w-[100vh] ">
          <div className="p-[40px] ">
            {items.Description.split(".").map((desc, i) => (
              <span key={i}>
                {desc}
                {i < items.Description.split(".").length - 1 ? <br /> : null}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
      <div className="bg-[#E7E9EB] flex flex-col pl-6 gap-[15px] pb-3 w-[100vh] pr-6 shadow-2xl ">
        <div className="font-semibold text-[30px] pt-2">Example</div>
        <div className="bg-white font-mono font-semi ">
          {items.Example.split("<br/>").map((desc, i) => (
            <span key={i}>
              {desc}
              {i < items.Example.split("<br/>").length - 1 ? <br /> : null}
            </span>
          ))}
        </div>
        <div className="bg-[#04AA6D!important] w-[150px] h-[5vh] flex items-center justify-center rounded-lg font-semibold text-white">Try it yourself -&gt;</div>
      </div>
    </div>
    <div className="text-l bg-[#ffffcc] p-5 w-[100vh] h-[30vh]">
        <span className="font-semi text-3xl">Note:</span>
        <br></br>{items.Type}</div>
    </div>
  ));
  return (
    <div>
      <Header />
      <div
        className=" pt-[60px] bg-[#282A35!important] text-white  h-[100px]
      items-center flex flex-row justify-between  py-0 fixed  w-full" 
      >
        {data}
      </div>
      <div className="text-black pt-[84px]">{dataset}</div>
    </div>
  );
}
