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
    // a.setAttribute('onclick', 'moveSection(this)');
    a.setAttribute('href', '#');
    // a.setAttribute('name', menuData[i]);
    // a.setAttribute('id', '#' + menuData[i])
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
    }, 500);
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

const project = [
    {
        title: '고양이 가라사대',
        imgLink: './img/고양이가라사대.png',
        linkSite: 'https://e-7281998.github.io/cat-jjal-maker',
        linkCode: 'https://github.com/e-7281998/cat-jjal-maker/tree/main/cat-jjal-maker-cra',
        ex: [
            '영어 문구를 입력하면, 영어 문구가 작성된 고양이 사진을 랜덤으로 받아옵니다.',
            '사진위 하트를 클릭하면 로컬스토리지에 고양이 사진이 저장됩니다.',
            '(진유림 - 만들면서 배우는 리액트 강의를 수강하며 만들었습니다.)'
        ],
        add: [
            '사진 저장 시 고양이 소리 랜덤으로 발생',
            '사진 중복 저장 방지',
            '저장된 사진 띄우기, 삭제'
        ],
        skill: [
            'HTML', 'CSS', 'JavaScript', 'React'
        ]
    },
    {
        title: '영화 정보 사이트',
        imgLink: './img/영화정보.png',
        linkSite: 'https://e-7281998.github.io/movie',
        linkCode: 'https://github.com/e-7281998/movie/tree/main/src',
        ex: [
            'API로 영화 정보를 받옵니다.',
            '(노마드 코더 - 리액트로 영화 웹 서비스 만들기 강의를 수강하며 만들었습니다.'
        ],
        add: [
            '영화 제목 클릭시 영화와 관련한 정보 보기를 SPA로 보여주기',
            '뒤로가기 버튼 추가',
            '마우스 오버 시 영화 줄거리 보이기'
        ],
        skill: [
            'HTML', 'CSS', 'JavaScript', 'React'
        ]
    }
]
const projectUl = document.querySelector('#project ul');
project.map((l) => {
    const li = document.createElement('li'),
        projectTitle = document.createElement('p'),
        projectImg = document.createElement('img'),
        linkDiv = document.createElement('div'),
        linkSite = document.createElement('a'),
        linkCode = document.createElement('a'),
        exUl = document.createElement('ul'),
        exTitle = document.createElement('p'),
        addUl = document.createElement('ul'),
        addTitle = document.createElement('p'),
        // skillTitle = document.createElement('p'),
        skillUl = document.createElement('ul'),
        skillTitle = document.createElement('p');

    skillUl.setAttribute('class', 'useSkill')
    exTitle.innerText = '기본 정보';
    addTitle.innerText = '강의 수강 후 추가';
    skillTitle.innerText = '사용 스킬';
    // skillTitle.innerText = '사용 기술'

    addUl.append(addTitle);
    exUl.append(exTitle);
    skillUl.append(skillTitle);
    l.ex.map((exl) => {
        var exLi = document.createElement('li');
        exLi.innerText = '📌' + exl;
        exUl.append(exLi);
    });
    l.add.map((addl) => {
        var addLi = document.createElement('li');
        addLi.innerText = '✖️' + addl;
        addUl.append(addLi);
    });
    l.skill.map((skilll) => {
        var skillLi = document.createElement('li');
        skillLi.innerText = skilll;
        skillUl.append(skillLi);
    });

    projectTitle.innerText = l.title;
    linkSite.setAttribute('href', l.linkSite);
    linkSite.setAttribute('target', '_blank');
    linkSite.innerText = '🔎' + 'SITE'
    linkCode.setAttribute('href', l.linkCode);
    linkCode.setAttribute('target', '_blank');
    linkCode.innerText = '🔎' + 'CODE'
    projectImg.setAttribute('src', l.imgLink);
    linkDiv.append(linkSite, linkCode);
    li.append(projectTitle);
    li.append(projectImg, linkDiv, exUl, addUl, skillUl);
    projectUl.append(li);
});
