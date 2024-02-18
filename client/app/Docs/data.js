

let text = [
  {
    Name: "idu",
    Type: "let: The let keyword is used to declare variables. Variables declared with let have block Scope. Variables declared with let must be declared before use. Variables declared with let cannot be redeclared in the same scope",
    Description: "The let keyword in JavaScript is used to declare variables with block scope. When you declare a variable using let, it means that the variable is only accessible within the block, statement, or expression where it is defined. In Macha lang, variables can be declared using idu. Variables defined with the idu keyword cannot be redeclared and must be declared before use.",
    Example: "idu a = 10;<br/>idu b = 15;<br/>",
  },

  {
    Name: "irlli",
    Type: "const: A constant is a value which will not change during the execution of a program. The constants cannot be modified in the program.",
    Description:
      "In Macha lang, irlli keyword is used to declare a constant. Once they are declared, their value cannot be changed after it has been initialized and any attempt to modify it will result in an error. irlli is typically used for values that are intended to remain unchanged throughout the execution of a program, such as mathematical constants or configuration settings. ",
    Example: "irlli PI=3.14;",
  },

  {
    Name: "helu",
    Type: "print: print is a function that prints the specified message to the screen, or other standard output device. The message can be a string, or any other object, the object will be converted into a string before written to the screen.",
    Description: "In macha lang, helu is the keyword used to print the output of any program execution on the computer screen. The output can be a string, or any other object, the object will be converted into a string before being written to the screen.",
    Example: " macha.helu('Namma Karnataka'); ",
  },

  {
    Name: "sari", 
    Type: "true: true is a keyword representing the Boolean value for a positive condition. It is used in conditional statements to execute specific code when the condition is true. ",
    Description: "In Macha lang we use the keyword sari if a block of code is executed and the given condition is evaluated to sari ",
    Example: "idu y = 5; <br/>idu z = 5;<br/> enandre(z == y) { <br/> macha.helu('This is true');<br/> }",
  },
  
  {
    Name: "tappu", 
    Type: "false: false is a keyword representing the Boolean value for a negative condition. It is used in conditional statements to execute specific code when the condition is False.",
    Description: "In Macha lang we use the keyword tappu if a block of code is executed and the given condition is evaluated to tappu ",
    Example: "idu y = 6; <br/>idu z = 5;<br/> enandre(z != y) { <br/> macha.helu('This is false');<br/> }",
  },

  {
    Name: "enandre",
    Type: "if: An if-statement is a single selection statement. This statement is used when a set of statements have to be executed if the specified condition evaluates to true. It is also used when a set of statements have to be skipped when the given condition is evaluated to false. ",
    Description: "Macha lang supports the if conditionl statement. Inorder to define an if-statement in Macha lang, enandre is used. The keyword enandre must be followed by a condition which has to be evaluated and it must be enclosed within paranthesis. The statements that has to be executed are enclosed within braces. enandre block will execute if specified condition is nija. If the condition is sullu, another block of code can be executed.",
    Example: "enandre(a>10){<br/><pre style='display: inline;'>    </pre>macha.helu('hello');<br/>}<br/>",
  },

  {
    Name: "illava",
    Type: "else: If one set of statements have to be executed when the given condition is evaluated to true and another set of statements have to be executed when the condition is false, then the if-else statement is used. The if-else statement is a simple selection statement that is used when we must choose between two alternatives. Hence, it is also called two-way selection statement. ",
    Description: "In Macha lang, illava is used to define the else statement. It has to be defined after the enandre statement. The keyword illava must be followed by the set of statements that has to be executed. If the enandre condition is sullu, then eventually the illava block will get executed",
    Example: "enandre(a>10){<br/><pre style='display: inline;'>    </pre>macha.helu('hi');<br/>}<br/>illandre(b>10){<br/><pre style='display: inline;'>    </pre>macha.helu('hello');<br/>}<br/>illava {<br/><pre style='display: inline;'>    </pre>macha.helu('error');<br/>}",
  },

  {
    Name: "illandre",
    Type: "else if: else-if statement is used if a set of statements has to be executed after evaluating many conditions.",
    Description: "Macha lang supports the else-if ladder construct. enandre block will execute if condition is nija, otherwise one of the subsequently added illandre blocks will execute if their respective condition is nija.",
    Example: "enandre(a>10){<br/><pre style='display: inline;'>    </pre>macha.helu('hi');<br/>}<br/>illandre(b>10){<br/><pre style='display: inline;'>    </pre>macha.helu('hello');<br/>}<br/>",
  },
  
  {
    Name: "allivaragu",
    Type: "for: A for loop is a control statement using which the user can give instructions to the computer to execute a set of statements repeatedly for a specified number of time. Once the specified number of times the loop is executed, the control comes out of the loop.",
    Description: "Macha lang supports the for control statement. allivargu is used to declare a for loop. allivargu is normally used when we know in advance exactly how many times a set of statements should be repeatedly executed. allivargu is a keyword followed by three expressions enclosed within parenthesis. The first expression contains initialization statements. The second expression is a relational expression that determines when the loop exits. The third expression contains updating expression. ",
    Example:
      "allivaragu(i=0;i<=5;i++){<br/><pre style='display: inline;'>    </pre>macha.helu(i);<br/>}<br/>",
  },

  {
    Name: "allitanka",
    Type: "while: A while loop is a control statement using which the user can give instructions to the computer to execute a set of statements repeatedly as long as the specified condition is satisfied. Once the specified condition is sullu, control comes out of the loop. ",
    Description:
      "while conditional loop can be declared in Macha lang by using the keyword allitanka. Statements inside allitanka blocks are executed as long as a specified condition evaluates to nija. The process is repeated until the condition becomes sullu. When the condition becomes sullu, statement within the loop stops executing and control passes to the statement following the loop. When creating an allitanka loop, one must always consider that it has to end at some point, therefore we must provide within the block some method to force the condition become sullu at some point, otherwise the loop will enter a state called infinite loop where it will continue looping forever. ",
    Example:
      "idu a = 1;<br/>allitanka(a<=5){<br/><pre style='display: inline;'>    </pre>macha.helu(a);<br/><pre style='display: inline;'>    </pre>a++;<br/>}<br/>",
  },

  {
    Name: "kelsa",
    Type: "function: The functions are written by the user to do specific tasks. Such a function can be called or invoked from anywhere and any number of times in the program.",
    Description:
      "In Macha lang, functions can be defined using kelsa. kelsa is a block of reusable code that performs a specific task. It typically takes input parameters, performs operations, and optionally returns a result.",
    Example:
      "kelsa(){<br/><pre style='display: inline;'>    </pre>macha.helu('hello world');<br/>}<br/>",
  },
  
  {
  	Name: "gumpu", 
  	Type: "array: An array is a collection of elements which can be referred by a common name. The particular position of an element in an array is called array index. ",
  	Description: "In Macha lang, we use '[]' to declare an array. The elements can be created at particular index in the array within square brackets ",
  	Example: "irlli gumpu = [];<br/> gumpu[0]= 'Hi';<br/> gumpu[1]= 'Hello';<br/> gumpu[2]= 'abc'",
  },

  {
  	Name: "vastu", 
  	Type: "object: In programming, an object is an instance of a collection ok key value pair, representing a structured unit with data.",
  	Description: "In Macha lang we use '{}' to create an object. Vastu is a collection of properties. You can access these properties in two ways: vastu['propertyName'] vastu.propertyName. In Macha Lang objects/vastu are always passed by reference.",
  	Example: "irlli vastu = {type:'Fiat', model:'500', color:'white'};",
  },

  {  
  	Name: "khali", 
  	Type: "null: null means that the absence of any object is intentional.",
  	Description: "In Macha lang we use khali to assign null. khali value in Macha lang is used for referring absence of any object value and if any function or variable returns khali, then we can infer that the object could not be created.",
  	Example: "irlli a=khali; <br/> macha.helu(a); ",
  },

  {
  	Name: "enuilla", 
  	Type: "undefined: undefined means that a variable is not initialized or a property of any object does not exist. ",
  	Description: " In Macha lang we use enuilla instead of undefined. enuilla refers to a variable or identifier that has been declared but has not been assigned any value. Accessing or using an undefined variable can lead to errors in a program. A method or statement also returns khali if the variable that is being evaluated does not have an assigned value. A function returns khali if a value was not returned.",
  	Example: "irlli a; <br/> macha.helu(a);",
  },
    
  {
  	Name: "mundehogu", 
  	Type: "continue: During the execution of a loop, it man be necessary to skip a part of the loop based on some condition. In such cases, we use continue statement. It is an unconditional branching statement used only in the loops to terminate the current iteration and continue with the remaining iterations.",
  	Description: "In Macha lang we use the keyword mundehogu to declare a continue statement. The mundehogu statement causes the program to skip the rest of the loop in the current iteration as if it is the end of the statement block had been reached, causing the control to jump to the start of the following iteration. mundehogu forces the next iteration of the loop to takeplace, skipping any code in between.",
  	Example: " allivargu(i=0;i<5;i++) { <br/> macha.helu(i); <br/> enandre(i == 4) { <br/> mundehogu;}};",
  },

  {
  	Name: "muri", 
  	Type: "break: The break statement is a jump statement which can be used in loops and switch sttatements. If break is executed in a loop, the control comees out of the loop and the statement following the loop will be executed. ",
  	Description: "In Macha lang we use muri to declare a break statement. When the muri statement is encountered inside a loop, the loop is immediately terminated when a specific condition is reached and program control resumes at the next statement. ",
  	Example: "allivargu(i=0;i<5;i++) { <br/> macha.helu(i); <br/> enandre(i == 4) { <br/> muri;}}",
  },

  {
  	Name: "kodu", 
  	Type: "return: The return keyword is used to exit a function and return a value to the calling code. It signifies the end of the function's execution and passes a specified result back to the point in the program where the function was called. If no value is specified after return, the function exits without returning a value.",
  	Description: "In Macha lang, we use the keyword kodu instead of return statement. The kodu statement ",
  	Example: "kelsa add() { <br/>  kodu 3+4;<br/> } <br/> macha.helu(add());",
  },

];

  export default text;