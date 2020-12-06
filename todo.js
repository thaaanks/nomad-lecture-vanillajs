const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){                                 // (8) 지우는 함수를 만들자.
    // console.log(event.target.parentNode);                   //  (8.5) event : 뭐했는지(클릭) // target: 뭘 클릭했는지 // parentNode: 클린한거 부모가 누군지 보여주는 것.
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // (8.5) 이제부터 localStorage 저장된 애도 지우도록 저장.
    // 우선 설명을 위해서: 
    // const cleanToDos = toDos.filter(anyFn);      // filter: (아까 객체의 forEach처럼) 일단 array안의 모든 요소에 대해서, 괄호 안의 함수(anyFn)을 실행시킴 -> 그리고 true로 return되는 애들만 모인 새 array를 만든다. 
    // console.log(cleanToDos);                     // 그래서 얘를 하면, toDos중에서 filterFn을 참으로 만드는 애들만 모인 배열을 출력.
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);              // (8.6) 여기서 toDo.id는 숫자, li.id는 문자열이어서, 숫자로 바꾸기 위해 parseInt를 씀
    }); 
    toDos = cleanToDos;    // (8.7) 옛toDos에 지운뒤 업데이트된 새 claentoDos를 넣자.
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));           // (6) localStorage에는 string만 저장가능. 그래서 객체를 string화.
}
function paintToDo(text){
    const li = document.createElement("li");         // (i.1) 빈 li 태그 만들기 !
    const delBtn = document.createElement("button"); //    (1) 버튼 태그 만들기 
    const span = document.createElement("span");     //      (1) span 태그 만들기
    const newId = toDos.length + 1;                  // (5) li랑 객체에 번호부여하기 위해서.
    delBtn.innerHTML = "❌";                        //      (1.5) 버튼안에 값 넣기
    delBtn.addEventListener("click", deleteToDo);    // (iii.8) 버튼 클릭하면 지우는함수 호출
    span.innerText = text;                           //      (1.5) span안에 값 넣기
    li.appendChild(delBtn);                          // (2) li 안에 버튼 넣기
    li.appendChild(span);                            //    (2) li 안에  span 넣기
    li.id = newId;                                   // (5.5) li에 번호부여 ofr delet할 li지정
    toDoList.appendChild(li);                        // (3) li를 toDolist Ul에 넣기
    const toDoObj = {                                // (ii.4) 입력된걸 객체로 저장 for saving in LocalStorage
        text: text,
        id: newId
    };
    toDos.push(toDoObj);                             // (4.5) 객체를 toDos 배열에 넣어주기
    saveToDos();                                     //  (6) toDos객체를 저장하자

}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){                           // (7) 이미 저장된 애들 새로고침해도 불러오는역할.
        const parsedToDos = JSON.parse(loadedToDos)
        console.log(parsedToDos);
        parsedToDos.forEach(function(toDo){             // (7) parsedToDos 각각에 대해 다음 함수실행. forEach는 객체용 함수.
            paintToDo(toDo.text);
        });
    }

}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();