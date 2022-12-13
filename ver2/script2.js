const createEl = ((el) => document.createElement(el));
const querySel = ((el) => document.querySelector(el));

const classRemove = (tag, value) => { tag.classList.remove(value); }
const classAdd = (tag, value) => { tag.classList.add(value); }
const setId = (tag, value) => { tag.setAttribute("id", value) };
const setHeight = (tag) => { tag.style = "min-height:" + window.innerHeight + "px" };

const header = querySel("header");
const main = querySel("main");

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

const introTxt = "안녕하세요.\n신입 프론트엔드 개발자 전은정 입니다.\n방문해주셔서 감사합니다."
var introTimer;
const h1 = createEl("h1");
header.append(h1);
function Intro() {
    var i = 0;
    introTimer = setInterval(() => {
        h1.innerText = h1.innerText + introTxt.charAt(i).replace(" ", '\u00a0');
        i++;
        if (introTxt.length === h1.innerText.length) {
            clearInterval(introTimer);
            classRemove(stopIntroBtn, "dis_n");
        }
    }, 250);
}
Intro();

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

const stopIntroBtn = createEl("button");
stopIntroBtn.innerText = "REPLAY";
classAdd(stopIntroBtn, "dis_n");
stopIntroBtn.onclick = () => {
    h1.innerText = "";
    classAdd(stopIntroBtn, "dis_n");
    Intro();
}
header.append(stopIntroBtn);

const skillList = [
    {
        name: 'HTML',
        img: './img/html.png',
        desc: ['시맨틱 태그 사용'],
    },
    {
        name: 'CSS',
        img: './img/css.png',
        desc: ['flex 사용', 'animation 사용', 'flex 사용', 'flex 사용', 'flex 사용',],
    },
    {
        name: 'JavaScript',
        img: './img/javascript.png',
        desc: ['ES6 사용']
    },
    {
        name: 'React',
        img: './img/react.png',
    },
]

const sectionSkill = createEl("section");

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
function skillHeight() {
    const subul = document.querySelectorAll('#SKILL ul ul');
    const h2 = querySel('h2');
    const titul = document.querySelector('#SKILL ul');
    var subulH = 0;
    for (var i = 0; i < subul.length; i++) {
        subulH = Math.max(subulH, subul[i].offsetHeight);
    }
    subulH += h2.offsetHeight + titul.offsetHeight + subulH;

    if (window.innerHeight > subulH) {
        setHeight(sectionSkill);
    } else {
        sectionSkill.style.height = subulH + 'px';
    }
}
Skill();


var prevScroll = 0;
window.addEventListener("scroll", () => {
    const current = window.scrollY;
    if (current > prevScroll) {
        classAdd(nav, "hide");
    } else {
        classRemove(nav, "hide");
    }
    prevScroll = current;
});


window.onresize = () => {
    headerHeight();
    skillHeight();
}