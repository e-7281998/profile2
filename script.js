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
        // if (sectionHeight[i] - (sectionHeight[i] / 4) <= top) {
        if (sectionHeight[i] * 0.9 <= top) {
            body[0].style.background = bodyColor[i];
            //menuList 글자 색 바꿔주기
            for (var j = 0; j < menuLi.length; j++) {
                i === j ? menuLi[j].children[0].style = `color: ${bodyColor[i]}` : menuLi[j].children[0].style = 'color: lightgrey';
            }
        }
    }
    if (sectionHeight[1] * 0.9 <= top) skillUp();
});

const skillList = [
    {
        no: 1,
        skill: 'HTML5',
        color: '#ff5722',
        level: ['시맨틱 태그를 사용할 수 있습니다.']
    }, {
        no: 2,
        skill: 'CSS',
        color: '#0091ea',
        level: ['Flex를 사용할 수 있습니다.']
    }, {
        no: 3,
        skill: 'JavaScript',
        color: '#ffca28',
        level: ['ES6 문법을 사용할 수 있습니다.']
    }, {
        no: 4,
        skill: 'React',
        color: '#90caf9',
        level: ['Hook을 사용할 수 있습니다.', 'React-router-dom을 사용할 수 있습니다.', 'API를 사용할 수 있습니다.']
    }
];
//skill만들기
const skill = document.getElementById('skill');
skillList.map((n) => {
    const div = document.createElement('div');
    const title = document.createElement('p');
    title.style.backgroundColor = n.color;
    const levelUl = document.createElement('ul');
    n.level.map((l) => {
        const levelLi = document.createElement('li');
        levelLi.innerText = l;
        levelUl.append(levelLi);
    });
    title.innerText = n.skill;
    div.append(title, levelUl);
    skill.append(div);
});
//skill 보여주기
function skillUp() {
    var i = 0
    const skillUpInterval = setInterval(function () {
        skill.children[i].style = 'opacity: 1; top:0; transition: all .6s ease-in;';
        i++;
        if (i == skillList.length) clearInterval(skillUpInterval);
    }, 300);

}