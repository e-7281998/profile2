const createEl = ((el) => document.createElement(el));
const querySel = ((el) => document.querySelector(el));

const classRemove = (tag, value) => { tag.classList.remove(value); }
const classAdd = (tag, value) => { tag.classList.add(value); }
const setId = (tag, value) => { tag.setAttribute("id", value) };
const setHeight = (tag) => { tag.style = "min-height:" + window.innerHeight + "px" };

const header = querySel("header");
setHeight(header);

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
        desc: ['flex 사용', 'animation 사용'],
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
setHeight(sectionSkill);
function Skill() {
    setId(sectionSkill, navList[1]);
    skillList.map((skill) => {
        const div = createEl("div");
        const img = createEl("img");
        img.setAttribute("src", skill.img);
        img.setAttribute("alt", skill.name);
        const ul = createEl("ul");
        const p = createEl("p");
        p.innerText = skill.name;
        skill.desc?.map((desc) => {
            const li = createEl("li");
            li.innerText = desc;
            ul.append(li);
        })
        div.append(img, p, ul);
        sectionSkill.append(div);
    })
    main.append(sectionSkill);
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
    setHeight(header);
}