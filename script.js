const header = document.getElementsByTagName('header'),
    nav = document.getElementsByTagName('nav'),
    menu = document.getElementById('menu');

//nav
const menuData = ['info', 'skill', 'project'];
var menuDataWidth = 0;
//#menu li a 생성, 값 넣기
for (var i = 0; i < menuData.length; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', '#' + menuData[i]);
    a.innerText = menuData[i];
    li.append(a);
    menu.append(li);
    //menu width값 가장 큰 것 구하기
    menuDataWidth = Math.max(li.offsetWidth, menuDataWidth);
};

//가장 큰 메뉴 width값으로 다 설정
const menuLi = document.querySelectorAll('#menu li');
for (var j = 0; j < menuData.length; j++) {
    menuLi[j].style.width = menuDataWidth + 'px';
}

//main margin 설정
const main = document.getElementsByTagName('main');
main[0].style.margin = (header[0].offsetHeight + 50) / 16 + 'rem' + ' 0';


//info h3 - 소개문구 1.5초마다 생성
const introduceMent = document.querySelectorAll('#info h3 p');
function introduce() {
    var i = 0;
    setInterval(function () {
        var j = (i === 0) ? introduceMent.length - 1 : i - 1;
        introduceMent[i].classList.add('show');
        // introduceMent[j].classList.remove('show');
        i++;
        if (i === introduceMent.length) i = 0;
    }, 1500);
}
introduce();

//위치에 따라 배경색 바꾸기
const bodyColor = ['#CDF0EA', '#F7DBF0', '#BEAEE2'];
const section = document.getElementsByTagName('section');
const sectionHeight = [];   //section 높이 담음
//각 section의 높이 계산
//section높이 정식으로 정해지면 수정하기
for (var i = 0; i < section.length; i++) {
    sectionHeight[i] = section[i].offsetHeight * i;
}

const doc = document.documentElement;   //문서자체를 가져옴
const body = document.getElementsByTagName('body');
//scroll이벤트
window.addEventListener('scroll', function () {
    var top = doc.scrollTop;    //스크롤 값 계산
    header[0].offsetHeight < top ? header[0].style = 'box-shadow: 0 1px 10px 7px #eee;' : header[0].style = 'box-shadow: none;';
    for (var i = 0; i < sectionHeight.length; i++) {
        sectionHeight[i] - (sectionHeight[i] / 4) < top ? body[0].style.background = bodyColor[i] : '';
    }
    console.log(top);
});


