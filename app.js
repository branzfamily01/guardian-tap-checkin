const SAMPLE = {
  "1年": {
    "1組": ["青木 陽菜","石井 悠斗","伊藤 結月","加藤 湊","木村 葵","小林 蓮","佐藤 凛","鈴木 陽翔","高橋 咲","田中 樹","中村 美月","山田 悠真"],
    "2組": ["阿部 花","井上 翔","遠藤 葵","小川 悠","斎藤 凛","清水 陽","高木 結","中島 湊","藤田 彩","松本 蓮","山口 咲","渡辺 樹"]
  },
  "2年": {
    "1組": ["青山 凛","石川 悠","伊東 咲","加納 蓮","木下 葵","小松 陽","佐々木 結","鈴木 湊","高田 彩","田村 樹","中川 花","山本 翔"],
    "2組": ["安藤 悠","池田 咲","上田 蓮","加藤 彩","木村 結","小林 湊","佐藤 葵","鈴木 樹","高橋 花","田中 翔","中村 陽","山田 凛"]
  },
  "3年": {
    "1組": ["青木 結","石井 陽","伊藤 咲","加藤 蓮","木村 凛","小林 彩","佐藤 湊","鈴木 葵","高橋 樹","田中 花","中村 翔","山田 悠"],
    "2組": ["阿部 葵","井上 樹","遠藤 花","小川 翔","斎藤 陽","清水 結","高木 湊","中島 凛","藤田 悠","松本 咲","山口 蓮","渡辺 彩"]
  }
};

const state = { grade:null, className:null, student:null, guardian:null };
const app = document.getElementById("app");
const undoBtn = document.getElementById("undoBtn");
const adminBtn = document.getElementById("adminBtn");
let adminMode = false;

function records(){ return JSON.parse(localStorage.getItem("guardianCheckins") || "[]"); }
function saveRecords(v){ localStorage.setItem("guardianCheckins", JSON.stringify(v)); }

function render(){
  adminMode = false;
  if(!state.grade) return renderGrades();
  if(!state.className) return renderClasses();
  if(!state.student) return renderStudents();
  if(state.guardian === null) return renderGuardians();
  return renderCompanions();
}
function renderGrades(){
  app.innerHTML = `
    <div class="step-kicker">STEP 1 / 5</div>
    <h2 class="step-title">お子さまの学年を<br>押してください</h2>
    <p class="step-sub">青い大きなボタンを1回押します。</p>
    <div class="grid">
      ${Object.keys(SAMPLE).map(g=>`<button class="big-btn primary" data-grade="${g}">${g}</button>`).join("")}
    </div>`;
  app.querySelectorAll("[data-grade]").forEach(b=>b.onclick=()=>{state.grade=b.dataset.grade;render();});
}
function renderClasses(){
  const classes = Object.keys(SAMPLE[state.grade]);
  app.innerHTML = `
    <div class="step-kicker">STEP 2 / 5</div>
    <h2 class="step-title">${state.grade}の<br>クラスを押してください</h2>
    <p class="step-sub">お子さまのクラスを選びます。</p>
    <div class="grid four">
      ${classes.map(c=>`<button class="big-btn secondary" data-class="${c}">${c}</button>`).join("")}
    </div>`;
  app.querySelectorAll("[data-class]").forEach(b=>b.onclick=()=>{state.className=b.dataset.class;render();});
}
function renderStudents(){
  const names = SAMPLE[state.grade][state.className];
  const recs = records();
  app.innerHTML = `
    <div class="step-kicker">STEP 3 / 5</div>
    <h2 class="step-title">${state.grade} ${state.className}<br>お子さまの名前を押してください</h2>
    <p class="step-sub">受付済みの名前には ✓ がつきます。</p>
    <div class="name-grid">
      ${names.map(n=>{
        const checked = recs.some(r=>r.student===n && r.grade===state.grade && r.className===state.className);
        return `<button class="name-btn ${checked?"checked":""}" data-name="${n}">${checked?"✓ ":""}${n}</button>`;
      }).join("")}
    </div>`;
  app.querySelectorAll("[data-name]").forEach(b=>b.onclick=()=>{
    state.student=b.dataset.name;
    const already = records().some(r=>r.student===state.student && r.grade===state.grade && r.className===state.className);
    if(already && !confirm("この生徒はすでに受付済みです。\n別の保護者が後から来た場合は「OK」で続けてください。")) return;
    render();
  });
}
function renderGuardians(){
  app.innerHTML = `
    <div class="step-kicker">STEP 4 / 5</div>
    <div class="choice-summary">${state.grade} ${state.className}　${state.student}</div>
    <h2 class="step-title">保護者は<br>何名ですか？</h2>
    <p class="step-sub">保護者 ＝ お父さま・お母さま</p>
    <div class="grid two">
      <button class="big-btn primary" data-g="1">1名</button>
      <button class="big-btn primary" data-g="2">2名</button>
    </div>`;
  app.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{state.guardian=Number(b.dataset.g);render();});
}
function renderCompanions(){
  app.innerHTML = `
    <div class="step-kicker">STEP 5 / 5</div>
    <div class="choice-summary">${state.grade} ${state.className}　${state.student}<br>保護者 ${state.guardian}名</div>
    <h2 class="step-title">同行者は<br>何名ですか？</h2>
    <p class="step-sub">同行者 ＝ 祖父母・きょうだい・その他の方</p>
    <div class="count-grid">
      ${[0,1,2,3,4,5,6,7,8,9].map(n=>`<button class="count-btn" data-c="${n}">${n}<span>名</span></button>`).join("")}
    </div>`;
  app.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>complete(Number(b.dataset.c)));
}
function complete(companion){
  const total = state.guardian + companion;
  const rec = {
    id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random()),
    date: new Date().toISOString(),
    grade: state.grade,
    className: state.className,
    student: state.student,
    guardians: state.guardian,
    companions: companion,
    total
  };
  const all = records(); all.push(rec); saveRecords(all);
  app.innerHTML = `
    <div class="success">
      <div class="check">✓</div>
      <h2>受付完了</h2>
      <div class="total">合計 ${total}名</div>
      <p>保護者 ${state.guardian}名　＋　同行者 ${companion}名</p>
      <p>そのままお進みください</p>
    </div>`;
  setTimeout(()=>{reset();render();},1800);
}
function reset(){ state.grade=null;state.className=null;state.student=null;state.guardian=null; }
undoBtn.onclick=()=>{
  if(adminMode){render();return;}
  if(state.guardian!==null){state.guardian=null;return render();}
  if(state.student){state.student=null;return render();}
  if(state.className){state.className=null;return render();}
  if(state.grade){state.grade=null;return render();}
};
adminBtn.onclick=()=>{
  adminMode=true;
  const all=records();
  const g=all.reduce((s,r)=>s+r.guardians,0), c=all.reduce((s,r)=>s+r.companions,0), t=all.reduce((s,r)=>s+r.total,0);
  app.innerHTML=`
    <div class="step-kicker">受付状況</div>
    <h2 class="step-title">本日の受付集計</h2>
    <div class="stats">
      <div class="stat"><span>受付件数</span><strong>${all.length}</strong></div>
      <div class="stat"><span>保護者</span><strong>${g}</strong></div>
      <div class="stat"><span>同行者</span><strong>${c}</strong></div>
      <div class="stat"><span>合計</span><strong>${t}</strong></div>
    </div>
    <div class="admin-card" style="margin-top:20px">
      <div class="table-wrap"><table>
      <thead><tr><th>学年</th><th>クラス</th><th>生徒</th><th>保護者</th><th>同行者</th><th>合計</th></tr></thead>
      <tbody>${all.slice().reverse().map(r=>`<tr><td>${r.grade}</td><td>${r.className}</td><td>${r.student}</td><td>${r.guardians}</td><td>${r.companions}</td><td>${r.total}</td></tr>`).join("")}</tbody>
      </table></div>
    </div>
    <button class="big-btn secondary compact" id="backReception">受付へ戻る</button>`;
  document.getElementById("backReception").onclick=()=>render();
};
render();
