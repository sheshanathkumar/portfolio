
const techSkill = document.querySelector("#techSkill");
const toolSkill = document.querySelector("#tools")
const getAboutMeId = document.querySelector("#about-me");
const allAboutMe = document.querySelector("#about-myself");
const companyId = document.querySelector("#company-detail");
const eduDetails = document.querySelector("#edu-detail");
const myContact = document.querySelector("#contacts");
const headnameId = document.querySelector("#headname");
const roleId = document.querySelector("#roles");
const achieveId = document.querySelector("#achieve");
const downloadResumeId = document.querySelector("#download-resume");
const leftPannel = document.querySelector("#left-pannel");
const rightPannel = document.querySelector("#right-pannel");
const profileId = document.querySelector("#profile");

let emailTo = "https://mail.google.com/mail/?view=cm&fs=1&to=";


let sidebar = false;
let profilePic = false;

function showProfile() {

    profilePic = !profilePic;
    if (profilePic === true) {
        profileId.style.visibility = 'visible';
    }
    else {
        profileId.style.visibility = 'hidden';
    }

}

function enableSidebar() {
    console.log(sidebar)
    sidebar = !sidebar;
    if (sidebar === true) {
        rightPannel.style.display = "none";
        leftPannel.style.display = "block"

    } else {
        leftPannel.style.display = "none";
        rightPannel.style.display = "block"
    }
}

function download(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = url.split('/').pop();
    document.body.appendChild(a);
    a.click()
    document.body.removeChild(a);
}

const fetchJson = async (localJson) => {
    const res = await fetch(localJson);
    const data = await res.json();
    return data;
}

// fetching Skills set from Skills.json
const displaySkills = async () => {
    const skills = await fetchJson("./asset/skills.json");
    let skillSet = skills.map((object) => {

        const { TechnicalSkill, Tools } = object;

        let arr = TechnicalSkill.split(",");
        for (i = 0; i < arr.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = " <span>&#8226;</span> " + arr[i];
            techSkill.appendChild(li);
        }

        arr = Tools.split(",");
        for (i = 0; i < arr.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = " <span>&#8226;</span> " + arr[i];
            toolSkill.appendChild(li);
        }
    })
}
displaySkills();

// fetching About me json file
const aboutMe = async () => {
    const getAboutme = await fetchJson("./asset/misc-text.json");
    const { name, tag, baseline, aboutMe, phone, email, linkedIn, linkedInUrl, location, roles, achievement } = getAboutme;
    var h = document.createElement('h6');
    h.innerHTML = aboutMe;
    getAboutMeId.appendChild(h);
    emailTo = emailTo + email;
    console.log(emailTo);
    myContact.innerHTML =
        `
    <h6> <i class="fa fa-phone"></i> ${phone} </h6>
    <h6> <i class="fa fa-envelope"></i> <a href= '${emailTo}' target="_blank">  ${email} </a> </h6>
    <h6> <i class="fa fa-linkedin"> </i> <a href= '${linkedInUrl}' target="_blank"> ${linkedIn} </a> </h6>
    <h6> <i class="fa fa-map"></i> ${location} </h6>
    `

    headnameId.innerHTML = `
                <h1>${name}</h1>
                <h4>${tag}</h4>
                <h6>${baseline}</h6>
    `

    let myRoles = roles.map((x) => {
        return `<h6><span>&#8226;</span> ${x}.</h6>`
    }).join("");
    roleId.innerHTML = myRoles;

    let myAchieve = achievement.map((x) => {
        return `<h6><span>&#8226;</span> ${x}</h6>`
    }).join("");
    achieveId.innerHTML = myAchieve;


}
aboutMe();


// fetching work experience
const exp = async () => {
    const myExp = await fetchJson("./asset/experience.json");
    let expObj = myExp.map((object) => {
        const { company, companyUrl, role, duration, projects } = object

        let projectData = projects.map((obj) => {

            const { name, techStack, description } = obj;
            const desc = description.split(".");
            let descObj = desc.map((obj) => {


                return (obj.length !== 0) ? `
                    <ul class="list-desc">
                        <li >
                        <span>&#8226;</span> ${obj.trim()}.
                         </li>
                    </ul>
                `
                    : ""

            }).join("");

            return `
            <div class="p-desc my-2">
                <h4 style="color:#3D3C3A">Project- ${name} </h>
                <h6> <strong> ${techStack} </strong> </h6>
                
                ${descObj}
                
            </div>           
        `
        }).join("");

        return `
            <div class="mx-3 c-profile">

                <div>
                    <h4> <a href="${companyUrl}" target="_blank">
                      ${company} </a> &nbsp; </h4>
                </div>
                <div style="width: 60%; margin-top: 5px;">
                    <h6>
                        ${role} &nbsp; ${duration}
                    </h6>
                </div>
            </div>
            <div class="project">
                <div class="mx-3">
                    ${projectData}
                </div>
            </div>`
    }).join("");

    companyId.innerHTML = expObj;
}
exp();


// fetch education details
const educations = async () => {
    const myEdu = await fetchJson("./asset/education.json");
    let eduObj = myEdu.map((obj) => {

        const { course, from, year } = obj;

        return `
        <div class="row"  style="font-weight: 500; font-size: medium;">
        <div class="col-3">
            ${course}
        </div>
        <div class="col-6">
            ${from}
        </div>
        <div class="col">
            ${year}
        </div></div>
        `
    }).join("");
    eduDetails.innerHTML = eduObj;
}

educations()