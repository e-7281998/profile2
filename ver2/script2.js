const createEl = ((el) => document.createElement(el));
const querySel = ((el) => document.querySelector(el));

const classRemove = (tag, value) => { tag.classList.remove(value); }
const classAdd = (tag, value) => { tag.classList.add(value); }
const setId = (tag, value) => { tag.setAttribute("id", value) };
const setHeight = (tag) => { tag.style = "min-height:" + window.innerHeight + "px" };

const header = querySel("header");
const main = querySel("main");

//메뉴
const navList = ["HOME", "SKILL", "PROJECT"];
const nav = createEl("nav");
function Nav() {
    const ul = createEl("ul");

    navList.map((txt) => {
        const li = createEl("li");
        const a = createEl("a");
        a.innerText = txt;
        a.setAttribute("href", "#" + txt);
        li.append(a);
        ul.append(li);
    });

    nav.append(ul);
    header.append(nav)
}
Nav();
setId(header, navList[0]);

//home 인사말
const introTxt = "안녕하세요.\n신입 프론트엔드 개발자 전은정 입니다.\n방문해주셔서 감사합니다."
var introTimer;
const h1 = createEl("h1");
header.append(h1);
function Intro() {
    var i = 0;
    introTimer = setInterval(() => {
        //공백은 유니코드로 바꿔주기
        h1.innerText = h1.innerText + introTxt.charAt(i).replace(" ", '\u00a0');
        i++;
        if (introTxt.length === h1.innerText.length) {
            clearInterval(introTimer);
            h1.innerHTML = h1.innerHTML.replace("전은정", "<span>전은정</span>");
            classRemove(stopIntroBtn, "dis_n");
        }
    }, 250);
}
Intro();

//hoem 높이
function headerHeight() {
    var fsHeight = document.defaultView.getComputedStyle(h1).getPropertyValue("font-size");
    fsHeight = fsHeight.replace('px', '');
    fsHeight *= 3;
    if (window.innerHeight > fsHeight) {
        setHeight(header);
    } else {
        header.style.height = fsHeight + 'px';
    }
}
headerHeight();

//replay버튼
const stopIntroBtn = createEl("button");
stopIntroBtn.innerText = "REPLAY";
classAdd(stopIntroBtn, "dis_n");
stopIntroBtn.onclick = () => {
    h1.innerText = "";
    classAdd(stopIntroBtn, "dis_n");
    Intro();
}

//github
const github = createEl('a');
github.setAttribute('href', 'https://github.com/e-7281998');
github.setAttribute('target', '_blank');
github.setAttribute('alt', 'github');
classAdd(github, 'github');

header.append(github, stopIntroBtn);

//skill
const skillList = [
    {
        name: 'HTML',
        img: './ver2/img/html.png',
        desc: ['시맨틱 태그 사용'],
    },
    {
        name: 'CSS',
        img: './ver2/img/css.png',
        desc: ['flex 사용', 'animation 사용'],
    },
    {
        name: 'JavaScript',
        img: './ver2/img/javascript.png',
        desc: ['ES6 사용'],
    },
    {
        name: 'React',
        img: './ver2/img/react.png',
        desc: ['Hook 사용', 'react-router-dom 사용'],
    }
]

const sectionSkill = createEl("section");
//skill 만들기
function Skill() {
    const h2 = createEl("h2");
    setId(sectionSkill, navList[1]);
    h2.innerText = navList[1];
    const titUl = createEl("ul");
    skillList.map((skill) => {
        const titLi = createEl("li");
        const imgA = createEl("a");
        const img = createEl("img");
        img.setAttribute("src", skill.img);
        img.setAttribute("alt", skill.name);
        imgA.setAttribute("href", "#" + skill.name);

        const subUl = createEl("ul");
        skill.desc?.map((txt) => {
            const subLi = createEl("li");
            subLi.innerText = txt;
            subUl.append(subLi);
        });

        imgA.append(img);
        titLi.append(imgA, subUl);
        titUl.append(titLi);

    })
    sectionSkill.append(h2, titUl);
    main.append(sectionSkill);
    skillHeight();

}
//skill 높이
function skillHeight() {
    const subul = document.querySelectorAll('#SKILL ul ul');
    const h2 = querySel('h2');
    const titul = document.querySelector('#SKILL ul');
    var subulH = 0;
    for (var i = 0; i < subul.length; i++) {
        subulH = Math.max(subulH, subul[i].offsetHeight);
    }
    subulH += h2.offsetHeight + titul.offsetHeight + subulH;
    const minSubUlH = subulH + (titul.offsetHeight * 2);
    subulH = Math.max(subulH, minSubUlH);

    if (window.innerHeight > subulH) {
        setHeight(sectionSkill);
    } else {
        sectionSkill.style.height = subulH + 'px';
    }
}
Skill();

//project 
const projectList = [
    {
        name: '고양이 가라사대',
        img: './ver2/projectImg/cat_jjal_site.png',
        desc: '영어 문구를 입력하면 해당 문구가 입력된 고양이 사진을 랜덤으로 받아옵니다. 사진 위 하트를 클릭하면 로컬 스토리지에 저장됩니다.',
        skill: ['HTML', 'CSS', 'JavaScript', 'React'],
        site: 'https://e-7281998.github.io/cat-jjal-maker/',
        code: 'https://github.com/e-7281998/cat-jjal-maker/tree/main/cat-jjal-maker-cra',
    },
    {
        name: '영화 정보 사이트',
        img: './ver2/projectImg/react_movie_site.png',
        desc: 'API를 통해 받아온 영화 정보를 보여줍니다. 마우스 오버 시 줄거리를 볼 수 있으며, 제목 클릭시 영화 상세 정보를 볼 수 있습니다.',
        skill: ['HTML', 'CSS', 'JavaScript', 'React'],
        site: 'https://e-7281998.github.io/movie/',
        code: 'https://github.com/e-7281998/movie/tree/main/src',
    },
    {
        name: '운동 기록 사이트',
        img: './ver2/projectImg/exercise_record_site.png',
        desc: '운동 목표를 세우고, 기록하는 사이트 입니다. 모든 정보는 로컬 스토리지에 저장됩니다. 개인정보는 최초 접속시에만 이루어지며, 수정이 가능합니다.',
        skill: ['HTML', 'styled-components', 'JavaScript', 'React'],
        site: 'https://lw6rnu-3000.preview.csb.app',
        code: 'https://github.com/e-7281998/exercise-record',
    },
    {
        name: '포트폴리오',
        img: './ver2/projectImg/profile.png',
        desc: '개인 포트폴리오 사이트 입니다.',
        skill: ['HTML', 'CSS', 'JavaScript'],
        site: '#HOME',
        code: 'https://github.com/e-7281998/profile2/tree/main/ver2',
    }
]
const sectionProject = createEl("section");
setId(sectionProject, navList[2]);
function Project() {
    const h2 = createEl("h2");
    h2.innerText = navList[2];
    const cardWrap = createEl("div");
    classAdd(cardWrap, 'cardWrap');
    projectList.map((pj) => {
        const card = createEl("div");
        classAdd(card, 'card');

        const front = createEl("div");
        classAdd(front, 'front');
        front.style = `background-image: url(${pj.img})`;

        const back = createEl("div");
        classAdd(back, 'back');
        const desc = createEl('p');
        desc.innerText = pj.desc;

        const skill = createEl('ul');
        pj.skill.map((sk) => {
            const li = createEl('li');
            li.innerText = sk;
            skill.append(li);
        });

        const link = createEl("div");
        const site = createEl("a");
        site.setAttribute("href", pj.site);
        pj.site[0] === "#" ? '' : site.setAttribute("target", "_blank");

        const code = createEl("a");
        code.setAttribute("href", pj.code);
        code.setAttribute("target", "_blank");
        link.append(site, code);
        back.append(desc, skill, link);

        const p = createEl("p");
        p.innerText = pj.name;

        card.append(front, back, p);
        cardWrap.append(card);
    })
    sectionProject.append(h2, cardWrap);
    main.append(sectionProject);

    projectHeight();
}
Project();
//project 높이
function projectHeight() {
    const pj = querySel('#PROJECT');
    const wrap = querySel('.cardWrap');
    const h2 = document.querySelectorAll('#PROJECT h2')[0];
    const pjHeight = wrap.offsetHeight + h2.offsetHeight;

    if (window.innerHeight > pjHeight) {
        setHeight(pj);
    } else {
        pj.style.height = pjHeight + 'px';
    }
}

//스크롤
var prevScroll = 0;
window.addEventListener("scroll", () => {
    //위로 올리면 메뉴 보이기
    const current = window.scrollY;
    if (current > prevScroll) {
        classAdd(nav, "hide");
    } else {
        classRemove(nav, "hide");
    }
    prevScroll = current;
    changeBodyColor(current);
});

//배경 색
const bodyColor = ['#97E5FF', '#FFA0B7', '#8CCD90'];
function navListHInfo(elPHT, elMTH, n) {
    return {
        "num": n,
        "elPHT": elPHT,
        "elMTH": elMTH,
    }
}
var navListH = [];  //높이계산 정보 담을 곳
function getHeightColor() {
    navList.map((el, n) => {
        //elH-높이, elT-탑
        const elH = document.getElementById(el).offsetHeight;
        const elT = document.getElementById(el).offsetTop;
        const elPHT = elH + elT;
        const elMTH = elT - (elH / 3);

        navListH.push(navListHInfo(elPHT, elMTH, n));
    });
}
//body색 바꾸기
function changeBodyColor(currentY) {
    navListH.map((el) => {
        if ((currentY >= el.elMTH) && (currentY < el.elPHT)) {
            document.body.style = 'background-color:' + bodyColor[el.num];
            changeNavColor(el.num);
        }
    })
}
//메뉴 색 바꾸기
function changeNavColor(num) {
    const navA = document.querySelectorAll('nav a');
    for (var i = 0; i < navA.length; i++) {
        if (i === num) {
            classAdd(navA[i], 'active');
            navA[i].style.color = bodyColor[i];
        } else {
            classRemove(navA[i], 'active');
            navA[i].style.color = '#ccc';
        }
    }
}
getHeightColor();
changeBodyColor(0); //초기에는 스크롤값 구하지 않으므로(스크롤 안움직임)


//브라우저 창 조절시
window.onresize = () => {
    headerHeight();
    skillHeight();
    projectHeight();
    getHeightColor();
}