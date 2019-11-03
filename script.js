let raw = []; //raw data 배열
let people = document.querySelector(".people"); //사진 들어갈 곳

let default_information = document.querySelector(".default_information"); //선택한 정보의 시작 코멘트
let select_information = document.querySelector(".select_information"); //랜덤 people의 정보
let list = document.querySelector(".list_information"); //이름,전화번호,주소,이메일 선택

let name, phone, address, email = null;
let img = document.querySelectorAll(".li"); //정보(이름,전화,주소,이메일)를 표현하는 이미지

// random 정보 (출차: https://randomuser.me)
fetch("https://randomuser.me/api/?results=1")
.then(function(response){
  return response.json();
})
.then(function(text) {
  raw.push(text["results"][0]);
  return raw[0];
})
.then(function(arr){
  makePhoto(arr);
});

//사진 넣기
function makePhoto(data) {
  let url = data["picture"]["large"];
  
  let photo = document.createElement("div");
  photo.classList.add("photo");
  photo.style.backgroundImage = "url('" + url + "')";
  people.appendChild(photo);
  
  name = data["name"]["first"] + data["name"]["last"];
  select_information.innerHTML = name;
}

//선택(이름,전화,주소,이메일)한 정보 나타내기
list.addEventListener("click", function(event){
  let selectItemName = event.target.parentElement.className;

  if(selectItemName === "name") {
    default_information.innerHTML = "My name is";
    name = raw[0]["name"]["first"] + raw[0]["name"]["last"];
    select_information.innerHTML = name;
  } else if (selectItemName === "phone") {
    default_information.innerHTML = "My phone number is";
    phone = raw[0]["phone"];
    select_information.innerHTML = phone;
  } else if (selectItemName=== "location") {
    default_information.innerHTML = "My address is";
    address = raw[0]["location"]["street"]["number"] + ", " + raw[0]["location"]["street"]["name"];
    select_information.innerHTML = address;
  } else if (selectItemName === "mail") {
    default_information.innerHTML = "My email address is";
    email = raw[0]["email"];
    select_information.innerHTML = email;
  }
})

//선택(이름,전화,주소,이메일)한 정보는 이미지에서 보여지게 나타내기 (이미지 변화 발생)
list.addEventListener("click", function(event){
  let selectItemName = event.target.parentElement.className;
 
  function changeSrc (value) {
    for(let i = 0; i < img.length; i++) {
      if(img[i].parentElement.className !== value) {
        img[i].setAttribute("src", img[i].parentElement.className+".jpg");
      } else {
        img[i].setAttribute("src", img[i].parentElement.className+"2.jpg");
      }
    }
  }

  changeSrc(selectItemName);
})
