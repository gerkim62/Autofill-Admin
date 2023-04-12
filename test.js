// function extractJson(str, hasIncompleteJson) {
//   //case where the string is not complete json
//   if (hasIncompleteJson) {
//     const openingIndex = str.search(/[\[{]/);
//     const hasNoJson = openingIndex === -1;

//     return hasNoJson ? "" : str.slice(openingIndex);
//   }

//   const startBraceIndex = str.indexOf("{");
//   const startBracketIndex = str.indexOf("[");

//   const hasNoJson = startBraceIndex === -1 && startBracketIndex === -1;
//   if (hasNoJson) {
//     return "";
//   }

//   const isJsonArray =
//     startBracketIndex !== -1 &&
//     (startBracketIndex < startBraceIndex || startBraceIndex === -1);

//   let openingChar, closingChar, openingIndex, closingIndex;

//   if (isJsonArray) {
//     openingChar = "[";
//     closingChar = "]";
//     openingIndex = startBracketIndex;
//   } else {
//     // isJsonObject since it's the only other option
//     openingChar = "{";
//     closingChar = "}";
//     openingIndex = startBraceIndex;
//   }

//   closingIndex = str.lastIndexOf(closingChar);
//   return closingIndex === -1 || closingIndex < openingIndex
//     ? ""
//     : str.slice(openingIndex, closingIndex + 1);
// }

// function getJson(str) {
//   const hasIncompleteJson = getHasIncompleteJson(str);
//   const json = extractJson(str, hasIncompleteJson);

//   return json;
// }

// let str2 =
//   'The correct answer in JSON format is:\n\n[\n  {\n    "choiceId": "q168739:9_answer4",\n    "explanation": "The characteristic \'to be universal that is to be everywhere in the world\' is not mentioned in the Bible as a characteristic of the true church in the last days.",\n    "questionId": "question-168739-9"\n  }\n]';

// console.log(getJson(str2));

function getHasIncompleteJson(jsonString) {
  let openBracketsCount = 0;
  let openBracesCount = 0;

  for (let i = 0; i < jsonString.length; i++) {
    const currentChar = jsonString[i];

    if (currentChar === "[") {
      openBracketsCount++;
    } else if (currentChar === "]") {
      openBracketsCount--;
    } else if (currentChar === "{") {
      openBracesCount++;
    } else if (currentChar === "}") {
      openBracesCount--;
    }

    if (openBracketsCount < 0 || openBracesCount < 0) {
      return true;
    }
  }

  return openBracketsCount > 0 || openBracesCount > 0;
}

function extractJsonStrings(str, hasIncompleteJson) {
  const strings = [];

  //incomplete json array string
  if (hasIncompleteJson && str.includes("[")) {
    const startIndex = str.indexOf("[");

    const json = str.slice(startIndex);

    return json;
  }

  //complete json array string
  if (!hasIncompleteJson && str.includes("[")) {
    const startIndex = str.indexOf("[");
    const endIndex = str.indexOf("]");

    const json = str.slice(startIndex, endIndex + 1);
    return json;
  }

  let i = 0;

  //looking for json strings
  while (i <= str.length) {
    if (str[i] === "{") {
      //means we found an opening brace,

      let objString = "";
      let braceCount = 1;

      //so we need to find the closing brace
      //loop through the string until we find the closing brace
      while (braceCount > 0) {
        objString += str[i++];
        if (str[i] === "{") braceCount++;
        if (str[i] === "}") braceCount--;

        //if we reach the end of the string, it means we didn't find a closing brace
        if (i === str.length) {
          //means we won't find a closing brace as we've reached the end of the string
          strings.push(objString);

          //the case of lack of closing brace in last object
          return strings;
        }
      }

      //means we found a closing brace
      strings.push(objString);
    } else {
      //move to the next character as it's not an opening brace
      i++;
    }
  }

  //we had already found all the closing braces
  return strings;
}

const str = `ere are the correct answers for each question:

1. {
        "choice": "Multiple processes at once.",
        "choiceId": "q213416:17_answer1",
        "explanation": "When memory is divided into fixed sized partitions, each partition may contain multiple processes at once.",
        "questionId": "question-213416-17"
    }

2. {
        "choice": "Bootstrap program.",
        "choiceId": "q213416:19_answer3",
        "explanation": "A Process Control Block (PCB) does not contain the Bootstrap program.",
        "questionId": "question-213416-19"
    }

3. {
        "choice": "True",
        "choiceId": "q213416:11_answertrue",
        "explanation": "The statement 'Critical Section is the part of a program which tries to access shared resources' is true.",
        "questionId": "question-213416-11"
    }

4. {
        "choice": "False",
        "choiceId": "q213416:15_answerfalse",
        "explanation": "Multiprogramming (having more programs in RAM simultaneously) increases total CPU efficiency (in comparison to Uniprogramming or Batch processing).",
        "questionId": "question-213416-15"
    }

5. {
        "choice": "Race conditions.",
        "choiceId": "q213416:6_answer1",
        "explanation": "Situations where two or more processes are reading or writing some shared data and the final results depend on the order of usage of the shared data are called Race conditions.",
        "questionId": "question-213416-6"
    }

6. {
        "choice": "Normal file system routines can be.",
        "choiceId": "q213416:8_answer2",
        "explanation": "If the swap space is simply a large file, within the file system, normal file system routines can be used to create it,`;

const hasIncompleteJson = getHasIncompleteJson(str);

const jsonStrings = extractJsonStrings(str, hasIncompleteJson);

console.log(jsonStrings);
