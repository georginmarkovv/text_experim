// script_builder_style_psychojs.js
// Полный PsychoJS-скрипт в Builder-style, переведённый из вашего Python-файла (включая Begin/EachFrame/End blocks).
// Источник: ваш файл allcodepy.txt. :contentReference[oaicite:1]{index=1}
//
// Перед запуском:
// 1) Подключите PsychoJS-скрипты в HTML (psychojs.js, util, visual и т.д.).
// 2) Поместите stimuli_block1_exp.csv и stimuli_block2_exp.csv в resources.
// 3) Укажите ваш DataPipe experimentID в sendDataToDataPipe().
// 4) Запустите через обычный HTML/Pavlovia.

//////////////////////////////////////////////////////////////////////////
// Инициализация PsychoJS
//////////////////////////////////////////////////////////////////////////
import * as psychojs from "./lib/psychojs-2025.1.1.js";

const psychoJS = new psychojs.core.PsychoJS({
  debug: true
});
const data = psychoJS.experiment;
psychoJS.openWindow({
  fullscr: true,
  color: new psychojs.util.Color('black'),
  units: 'norm'
});

//////////////////////////////////////////////////////////////////////////
// Экспериментальное info (как в вашем Python)
//////////////////////////////////////////////////////////////////////////
const expInfo = {
  participant: (Math.floor(Math.random() * 1e6)).toString().padStart(6,'0'),
  session: '001',
  date:  new Date().toISOString().replace(/[:.]/g, "-")
 
};

//////////////////////////////////////////////////////////////////////////
// Глобальные переменные (включая те, что были в Python)
//////////////////////////////////////////////////////////////////////////
let globalClock = new psychojs.core.Clock();
let routineTimer = new psychojs.core.Clock();

let ALL_GRID_POSITIONS = [];
let ALL_GRID_POSITIONS1 = [];

let background_words = [], targets = [];
let background_words1 = [], targets1 = [];

let thisExp_background_stims = [];
let thisExp_background_stims1 = [];

let text, key_resp;
let text_2, key_resp_2;
let crossbow;
let texttarget, key_resp_3;
let targettext1, key_resp_4;
let text_3;
let text_end;

//////////////////////////////////////////////////////////////////////////
// Utility: shuffle & CSV fetch + parsing
//////////////////////////////////////////////////////////////////////////
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function fetchCSV(path) {
  // Простая CSV -> array-of-objects, ожидает ,-delimiter и header in first row.
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Can't fetch ${path}: ${res.status}`);
  const txt = await res.text();
  const lines = txt.split(/\r?\n/).filter(l => l.trim() !== '');
  if (lines.length === 0) return { header: [], rows: [] };
  const header = lines[0].split(',').map(h => h.trim());
  const rows = lines.slice(1).map(line => {
    const cols = line.split(',');
    const obj = {};
    for (let i=0;i<header.length;i++) obj[header[i]] = (cols[i] !== undefined) ? cols[i].trim() : '';
    return obj;
  });
  return { header, rows };
}

//////////////////////////////////////////////////////////////////////////
// Инициализация сетки позиций и загрузка стимулов (Begin Experiment code)
//////////////////////////////////////////////////////////////////////////
async function initExperimentResources() {
  // копия вашей сетки (оба блока имеют одинаковую сетку в оригинале)
  ALL_GRID_POSITIONS = [
    [-0.85, 0.85], [-0.51, 0.85], [-0.17, 0.85], [0.17, 0.85], [0.51, 0.85], [0.85, 0.85],
    [-0.85, 0.74375], [-0.51, 0.74375], [-0.17, 0.74375], [0.17, 0.74375], [0.51, 0.74375], [0.85, 0.74375],
    [-0.85, 0.6375], [-0.51, 0.6375], [-0.17, 0.6375], [0.17, 0.6375], [0.51, 0.6375], [0.85, 0.6375],
    [-0.85, 0.53125], [-0.51, 0.53125], [-0.17, 0.53125], [0.17, 0.53125], [0.51, 0.53125], [0.85, 0.53125],
    [-0.85, 0.425], [-0.51, 0.425], [-0.17, 0.425], [0.17, 0.425], [0.51, 0.425], [0.85, 0.425],
    [-0.85, 0.31875], [-0.51, 0.31875], [-0.17, 0.31875], [0.17, 0.31875], [0.51, 0.31875], [0.85, 0.31875],
    [-0.85, 0.2125], [-0.51, 0.2125], [-0.17, 0.2125], [0.17, 0.2125], [0.51, 0.2125], [0.85, 0.2125],
    [-0.85, 0.10625], [-0.51, 0.10625], [-0.17, 0.10625], [0.17, 0.10625], [0.51, 0.10625], [0.85, 0.10625],
    [-0.85, 0.0], [-0.51, 0.0], [-0.17, 0.0], [0.17, 0.0], [0.51, 0.0], [0.85, 0.0],
    [-0.85, -0.10625], [-0.51, -0.10625], [-0.17, -0.10625], [0.17, -0.10625], [0.51, -0.10625], [0.85, -0.10625],
    [-0.85, -0.2125], [-0.51, -0.2125], [-0.17, -0.2125], [0.17, -0.2125], [0.51, -0.2125], [0.85, -0.2125],
    [-0.85, -0.31875], [-0.51, -0.31875], [-0.17, -0.31875], [0.17, -0.31875], [0.51, -0.31875], [0.85, -0.31875],
    [-0.85, -0.425], [-0.51, -0.425], [-0.17, -0.425], [0.17, -0.425], [0.51, -0.425], [0.85, -0.425],
    [-0.85, -0.53125], [-0.51, -0.53125], [-0.17, -0.53125], [0.17, -0.53125], [0.51, -0.53125], [0.85, -0.53125],
    [-0.85, -0.6375], [-0.51, -0.6375], [-0.17, -0.6375], [0.17, -0.6375], [0.51, -0.6375], [0.85, -0.6375],
    [-0.85, -0.74375], [-0.51, -0.74375], [-0.17, -0.74375], [0.17, -0.74375], [0.51, -0.74375], [0.85, -0.74375],
    [-0.85, -0.85], [-0.51, -0.85], [-0.17, -0.85], [0.17, -0.85], [0.51, -0.85], [0.85, -0.85]
  ];
  ALL_GRID_POSITIONS1 = ALL_GRID_POSITIONS.slice();

  // Загрузим CSV с тем же порядком, что использовался в Python (в Python использовались
  // iloc[1:91,1:14] для фоновых слов и row0 для targets). В CSV ожидаем header + строки.
  try {
    const csv1 = await fetchCSV('stimuli_block1_exp.csv'); // заменяет stimuli_block1_exp.xlsx
    if (csv1.rows.length > 0) {
      const header = csv1.header;
      // в вашем Python таргеты брались из столбца 'targetanimal'
      const targetCol = header.find(h => h.toLowerCase().includes('target')) || header[0];
      const bgCols = header.filter(h => h !== targetCol);
      // берём не более 91 строки (как в оригинале)
      let rowsToUse = csv1.rows.slice(0, 91);
      // собрать фоновые слова и targets
      let bg = [], tg = [];
      for (let r = 0; r < rowsToUse.length; r++) {
        const row = rowsToUse[r];
        if (row[targetCol]) tg.push(row[targetCol]);
        for (const c of bgCols) {
          const val = row[c];
          if (val && val.trim() !== '') {
            if (!val.toLowerCase().includes('о')) bg.push(val.trim());
          }
        }
      }
      background_words = Array.from(new Set(bg));
      targets = tg.filter(x => x !== undefined && x !== '').slice(0, 91);
      shuffleArray(background_words);
      shuffleArray(targets);
    }
  } catch (e) {
    console.warn('Failed to load block1 CSV:', e);
  }

  try {
    const csv2 = await fetchCSV('stimuli_block2_exp.csv');
    if (csv2.rows.length > 0) {
      const header2 = csv2.header;
      const targetCol2 = header2.find(h => h.toLowerCase().includes('target')) || header2[0];
      const bgCols2 = header2.filter(h => h !== targetCol2);
      let rows2 = csv2.rows.slice(0, 91);
      let bg1 = [], tg1 = [];
      for (let r = 0; r < rows2.length; r++) {
        const row = rows2[r];
        if (row[targetCol2]) tg1.push(row[targetCol2]);
        for (const c of bgCols2) {
          const val = row[c];
          if (val && val.trim() !== '') {
            if (!val.toLowerCase().includes('о')) bg1.push(val.trim());
          }
        }
      }
      background_words1 = Array.from(new Set(bg1));
      targets1 = tg1.filter(x => x !== undefined && x !== '').slice(0, 91);
      shuffleArray(background_words1);
      shuffleArray(targets1);
    }
  } catch (e) {
    console.warn('Failed to load block2 CSV (optional):', e);
  }
}

//////////////////////////////////////////////////////////////////////////
// Создание TextStim-ов, как в вашем Builder
//////////////////////////////////////////////////////////////////////////
function makeTextStim(textStr, pos=[0,0], height=0.06) {
  return new visual.TextStim({
    win: psychoJS.window,
    text: textStr,
    pos: pos,
    height: height,
    color: new util.Color('white'),
    font: 'Arial',
    units: 'norm'
  });
}

//////////////////////////////////////////////////////////////////////////
// Routine: welcome (Begin/EachFrame/End)
//////////////////////////////////////////////////////////////////////////
async function welcomeRoutineBegin() {
  // Begin Routine code (из Python: welcome routine init)
  text = makeTextStim(
    'Добро пожаловать в эксперимент!\\n\\nЗадача простая: на экране будет показана группа слов — найдите слово с буквой «о».\\n\\nРасположитесь удобно, чтобы Вас ничего не отвлекало.\\nНажмите Пробел, чтобы перейти к инструкции.'
  );
  key_resp = new core.Keyboard({psychoJS});
}

async function welcomeRoutineEachFrame() {
  // show and wait for space (в Builder это EachFrame loop)
  text.setAutoDraw(true);
  psychoJS.window.flip();
  // wait for keypress polling
  const keys = key_resp.getKeys({keyList:['space'], waitRelease:false});
  if (keys.length > 0) {
    key_resp.keys = keys[keys.length-1].name;
    key_resp.rt = keys[keys.length-1].rt;
    return 'finished';
  }
  return 'continue';
}

async function welcomeRoutineEnd() {
  // End Routine code (запись в thisExp как в Python)
  text.setAutoDraw(false);
  thisExp.addData('welcome.keys', key_resp.keys);
  if (key_resp.keys != null) thisExp.addData('welcome.rt', key_resp.rt);
  thisExp.nextEntry();
}

//////////////////////////////////////////////////////////////////////////
// Routine: instr
//////////////////////////////////////////////////////////////////////////
async function instrRoutineBegin() {
  text_2 = makeTextStim(
    'Инструкция\\n\\nНа каждом экране — множество слов.\\n\\nЕсли  нашли слово с буквой «о» — нажмите → (стрелка вправо).\\nЕсли ни одного слова с «о» нет — нажмите ← (стрелка влево).\\n\\nОтвечайте как можно быстрее, но точно.\\n\\nНажмите Пробел, когда будете готовы начать'
  );
  key_resp_2 = new core.Keyboard({psychoJS});
}

async function instrRoutineEachFrame() {
  text_2.setAutoDraw(true);
  psychoJS.window.flip();
  const keys = key_resp_2.getKeys({keyList:['space'], waitRelease:false});
  if (keys.length>0) {
    key_resp_2.keys = keys[keys.length-1].name;
    key_resp_2.rt = keys[keys.length-1].rt;
    return 'finished';
  }
  return 'continue';
}

async function instrRoutineEnd() {
  text_2.setAutoDraw(false);
  thisExp.addData('instr.keys', key_resp_2.keys);
  if (key_resp_2.keys != null) thisExp.addData('instr.rt', key_resp_2.rt);
  thisExp.nextEntry();
}

//////////////////////////////////////////////////////////////////////////
// Routine: cross1 (fixation)
//////////////////////////////////////////////////////////////////////////
async function cross1RoutineBegin() {
  crossbow = makeTextStim('+', [0,0], 0.2);
}

async function cross1RoutineEachFrame() {
  crossbow.setAutoDraw(true);
  psychoJS.window.flip();
  // display for 0.4s (as in Python)
  if (routineTimer.getTime() >= 0.4) {
    return 'finished';
  }
  return 'continue';
}

async function cross1RoutineEnd() {
  crossbow.setAutoDraw(false);
  thisExp.addData('cross1.stopped', globalClock.getTime());
  thisExp.nextEntry();
  // reset routine timer non-slip behaviour identical to Python:
  routineTimer.reset();
}

//////////////////////////////////////////////////////////////////////////
// Routine: trial1  (Block1)  -- полностью переносит Begin/EachFrame/End логику
//////////////////////////////////////////////////////////////////////////
async function trial1RoutineBegin() {
  // Begin routine code (перенос вашего Python 'Begin Routine' из code)
  // поведение как в Python: если targets пуст, k=1 и рутин завершается немедленно
  thisExp.background_stims = [];
  thisTrial = {}; // placeholder
  k = 0;
  if (!targets || targets.length === 0) {
    console.log("Все таргеты использованы! Завершаем рутину.");
    k = 1;
    // we will finish immediately in EachFrame by checking k
    current_target = '';
    selected_background = [];
    target_position = [0,0];
  } else {
    current_target = targets[Math.floor(Math.random()*targets.length)];
    // choose 16 random positions
    const trial_positions = shuffleArray(ALL_GRID_POSITIONS.slice()).slice(0,16);
    // choose target position from these
    target_position = trial_positions[Math.floor(Math.random()*trial_positions.length)];
    // background positions are all except target
    const background_positions = trial_positions.filter(pos => !(pos[0] === target_position[0] && pos[1] === target_position[1]));
    // choose 15 background words from background_words
    if (background_words.length >= 15) {
      selected_background = shuffleArray(background_words.slice()).slice(0,15);
    } else {
      selected_background = [];
      for (let i=0;i<15;i++) selected_background.push(background_words[Math.floor(Math.random()*background_words.length)]);
    }
    // create visual.TextStim for each background word (store in thisExp.background_stims)
    thisExp.background_stims = [];
    for (let i=0;i<selected_background.length;i++) {
      const w = selected_background[i];
      const pos = background_positions[i];
      const stim = new visual.TextStim({
        win: psychoJS.window,
        text: w,
        pos: pos,
        height: 0.06,
        color: new util.Color('white'),
        font: 'Arial',
        units: 'norm'
      });
      thisExp.background_stims.push(stim);
    }
  }

  // set up target TextStim and keyboard
  texttarget = new visual.TextStim({win:psychoJS.window, text:current_target, pos: target_position, height:0.06, color: new util.Color('white'), font:'Arial', units:'norm'});
  key_resp_3 = new core.Keyboard({psychoJS});
  // store start times (mirroring Python)
  // start routine timer for EachFrame
  routineTimer.reset();
}

async function trial1RoutineEachFrame() {
  // if k==1 => finish immediately (как в Python)
  if (k === 1) {
    return 'finished';
  }

  // Draw background stims
  for (const s of thisExp.background_stims) s.setAutoDraw(true);
  // draw target
  texttarget.setAutoDraw(true);
  psychoJS.window.flip();

  // Poll for left/right like Python did
  const keys = key_resp_3.getKeys({keyList:['left','right'], waitRelease:false});
  if (keys.length > 0) {
    key_resp_3.keys = keys[keys.length-1].name;
    key_resp_3.rt = keys[keys.length-1].rt;
    // End the routine on key
    return 'finished';
  }

  // check escape
  if (core.getKeys({keyList:['escape']}).length > 0) {
    thisExp.status = data.FINISHED;
    return 'abort';
  }

  return 'continue';
}

async function trial1RoutineEnd() {
  // End routine code (перенос вашего Python End Routine)
  // cleanup draw
  for (const s of thisExp.background_stims) s.setAutoDraw(false);
  texttarget.setAutoDraw(false);

  if (k === 1) {
    // set trials finished in Python - handled by loop logic below (we'll break outer loop)
  } else {
    // remove used target from array (как в Python targets.remove(current_target))
    const idx = targets.indexOf(current_target);
    if (idx > -1) targets.splice(idx,1);
    // delete temp background stims
    delete thisExp.background_stims;
  }

  // compute answr_corr as in Python
  let answr_corr = 0;
  if ((String(current_target)).toLowerCase().includes('о')) {
    if (key_resp_3.keys === 'right') answr_corr = 1;
    else answr_corr = 0;
  } else {
    if (key_resp_3.keys === 'left') answr_corr = 1;
    else answr_corr = 0;
  }

  thisExp.addData('current_target', current_target);
  thisExp.addData('answr_corr', answr_corr);

  // write key_resp_3 fields to trial data
  if (key_resp_3.keys === undefined || key_resp_3.keys === null) key_resp_3.keys = null;
  thisExp.addData('key_resp_3.keys', key_resp_3.keys);
  if (key_resp_3.keys !== null) thisExp.addData('key_resp_3.rt', key_resp_3.rt);

  thisExp.nextEntry();
  routineTimer.reset();
}

//////////////////////////////////////////////////////////////////////////
// Routine: trial2  (Block2)  -- аналогично trial1, использует targets1/background_words1
//////////////////////////////////////////////////////////////////////////
async function trial2RoutineBegin() {
  thisExp.background_stims1 = [];
  k1 = 0;
  if (!targets1 || targets1.length === 0) {
    console.log("Все таргеты использованы! Завершаем рутину.");
    k1 = 1;
    current_target1 = '';
  } else {
    current_target1 = targets1[Math.floor(Math.random()*targets1.length)];
    const trial_positions1 = shuffleArray(ALL_GRID_POSITIONS1.slice()).slice(0,16);
    target_position1 = trial_positions1[Math.floor(Math.random()*trial_positions1.length)];
    const background_positions1 = trial_positions1.filter(pos => !(pos[0] === target_position1[0] && pos[1] === target_position1[1]));
    if (background_words1.length >= 15) {
      selected_background1 = shuffleArray(background_words1.slice()).slice(0,15);
    } else {
      selected_background1 = [];
      for (let i=0;i<15;i++) selected_background1.push(background_words1[Math.floor(Math.random()*background_words1.length)]);
    }
    thisExp.background_stims1 = [];
    for (let i=0;i<selected_background1.length;i++) {
      const stim = new visual.TextStim({
        win: psychoJS.window,
        text: selected_background1[i],
        pos: background_positions1[i],
        height: 0.06,
        color: new util.Color('white'),
        font: 'Arial',
        units: 'norm'
      });
      thisExp.background_stims1.push(stim);
    }
  }
  // create target and keyboard
  targettext1 = new visual.TextStim({win:psychoJS.window, text: current_target1, pos: target_position1, height:0.06, color: new util.Color('white'), font:'Arial', units:'norm'});
  key_resp_4 = new core.Keyboard({psychoJS});
  routineTimer.reset();
}

async function trial2RoutineEachFrame() {
  if (k1 === 1) return 'finished';
  for (const s of thisExp.background_stims1) s.setAutoDraw(true);
  targettext1.setAutoDraw(true);
  psychoJS.window.flip();

  const keys = key_resp_4.getKeys({keyList:['left','right'], waitRelease:false});
  if (keys.length > 0) {
    key_resp_4.keys = keys[keys.length-1].name;
    key_resp_4.rt = keys[keys.length-1].rt;
    return 'finished';
  }
  if (core.getKeys({keyList:['escape']}).length > 0) {
    thisExp.status = data.FINISHED;
    return 'abort';
  }
  return 'continue';
}

async function trial2RoutineEnd() {
  for (const s of thisExp.background_stims1) s.setAutoDraw(false);
  targettext1.setAutoDraw(false);

  if (k1 === 1) {
    // leave loop; handled by loop logic
  } else {
    const idx = targets1.indexOf(current_target1);
    if (idx > -1) targets1.splice(idx,1);
    delete thisExp.background_stims1;
  }

  let answr_corr1 = 0;
  if (String(current_target1).toLowerCase().includes('о')) {
    if (key_resp_4.keys === 'right') answr_corr1 = 1;
    else answr_corr1 = 0;
  } else {
    if (key_resp_4.keys === 'left') answr_corr1 = 1;
    else answr_corr1 = 0;
  }
  thisExp.addData('current_target1', current_target1);
  thisExp.addData('answr_corr1', answr_corr1);
  if (key_resp_4.keys === undefined || key_resp_4.keys === null) key_resp_4.keys = null;
  thisExp.addData('key_resp_4.keys', key_resp_4.keys);
  if (key_resp_4.keys !== null) thisExp.addData('key_resp_4.rt', key_resp_4.rt);
  thisExp.nextEntry();
  routineTimer.reset();
}

//////////////////////////////////////////////////////////////////////////
// Routine: wait (show 'saving data' message)
//////////////////////////////////////////////////////////////////////////
async function waitRoutineBegin() {
  text_3 = makeTextStim('Не закрывайте вкладку! \nСохраняются данные...', [0,0], 0.05);
}
async function waitRoutineEachFrame() {
  text_3.setAutoDraw(true);
  psychoJS.window.flip();
  // We'll show until we finish sending data; control externally.
  return 'continue';
}
async function waitRoutineEnd() {
  text_3.setAutoDraw(false);
  thisExp.nextEntry();
}

//////////////////////////////////////////////////////////////////////////
// Routine: end (Спасибо)
//////////////////////////////////////////////////////////////////////////
async function endRoutineBegin() {
  text_end = makeTextStim('Спасибо за участие! Хорошего Вам дня!\n\n', [0,0], 0.06);
  routineTimer.reset();
}
async function endRoutineEachFrame() {
  text_end.setAutoDraw(true);
  psychoJS.window.flip();
  if (routineTimer.getTime() > 5.0) return 'finished';
  return 'continue';
}
async function endRoutineEnd() {
  text_end.setAutoDraw(false);
  thisExp.nextEntry();
}

//////////////////////////////////////////////////////////////////////////
// DataPipe: сбор данных и отправка (включая экранирование CSV)
// исходный пример был предоставлен вами — я включил улучшенную и безопасную версию
//////////////////////////////////////////////////////////////////////////
psychoJS._saveResults = 0; // отключаем автоматический скач

function getTrialsDataObject() {
  // Совместимость с разными версиями: пытаемся доставать _trialsData, experiment.data._trials и т.д.
  try {
    if (psychoJS._experiment && psychoJS._experiment._trialsData) return psychoJS._experiment._trialsData;
    if (psychoJS.experiment && psychoJS.experiment._trialsData) return psychoJS.experiment._trialsData;
    if (psychoJS.experiment && psychoJS.experiment.data && psychoJS.experiment.data._trials) return psychoJS.experiment.data._trials;
    if (psychoJS.experiment && Array.isArray(psychoJS.experiment._trials)) {
      const rows = [];
      psychoJS.experiment._trials.forEach(t => { if (t && t.data) rows.push(Object.assign({}, t.data)); });
      if (rows.length) return rows;
    }
  } catch (e) {
    console.warn('getTrialsDataObject warning:', e);
  }
  console.warn('No trials data object found in psychoJS.experiment internals.');
  return null;
}

function objectsToCSV(objArray) {
  if (!Array.isArray(objArray) || objArray.length === 0) return '';
  const keys = Object.keys(objArray[0]);
  const lines = [];
  lines.push(keys.map(k => `"${k.replace(/"/g, '""')}"`).join(','));
  for (const row of objArray) {
    const vals = keys.map(k => {
      const v = row[k] === undefined || row[k] === null ? '' : String(row[k]);
      return `"${v.replace(/"/g, '""')}"`;
    });
    lines.push(vals.join(','));
  }
  return lines.join('\n');
}

async function sendDataToDataPipe({ experimentID = '1aALn2OO9S9P' } = {}) {
  const dataObj = getTrialsDataObject();
  if (!dataObj || !Array.isArray(dataObj) || dataObj.length === 0) {
    console.warn('No trials data found to send to DataPipe.');
    return;
  }
  const csv = objectsToCSV(dataObj);
  const participantId = (psychoJS.experiment && psychoJS.experiment._participant) || (expInfo && expInfo.participant) || 'participant';
  const expName = (psychoJS._experiment && psychoJS._experiment._experimentName) || (psychoJS.experiment && psychoJS.experiment._experimentName) || 'experiment';
  const dt = (psychoJS._experiment && psychoJS._experiment._datetime) || (new Date()).toISOString().replace(/[:.]/g,'-');
  const filename = `${participantId}_${expName}_${dt}.csv`;
  const payload = { experimentID, filename, data: csv };
  console.log('Sending data to DataPipe, filename:', filename);
  try {
    const resp = await fetch('https://pipe.jspsych.org/api/data', {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'Accept':'*/*' },
      body: JSON.stringify(payload)
    });
    if (!resp.ok) {
      const txt = await resp.text();
      throw new Error(`DataPipe returned ${resp.status}: ${txt}`);
    }
    const respJson = await resp.json();
    console.log('DataPipe response:', respJson);
    if (typeof quitPsychoJS === 'function') quitPsychoJS();
    else psychoJS.quit({ message: 'Data sent to DataPipe', isCompleted: true });
  } catch (err) {
    console.error('Failed to send data to DataPipe:', err);
    // фоллбек: можно закомментировать скачивание, если хотите
    // const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url; a.download = filename; document.body.appendChild(a); a.click(); document.body.removeChild(a);
    // URL.revokeObjectURL(url);
    throw err;
  }
}

//////////////////////////////////////////////////////////////////////////
// Главная последовательность выполнения (имитирует Builder scheduler)
//////////////////////////////////////////////////////////////////////////
(async function main() {
  try {
    // 1) Инициализируем ресурсы (сетки, CSV и т.д.) — это Begin Experiment из Python
    await initExperimentResources();

    // 2) Welcome routine
    await welcomeRoutineBegin();
    while (true) {
      const status = await welcomeRoutineEachFrame();
      if (status === 'finished') break;
    }
    await welcomeRoutineEnd();

    // 3) Instr routine
    await instrRoutineBegin();
    while (true) {
      const status = await instrRoutineEachFrame();
      if (status === 'finished') break;
    }
    await instrRoutineEnd();

    // 4) Loop: trials (block1) — в Python это trials loop; выполняем пока targets есть
    while (targets && targets.length > 0) {
      await cross1RoutineBegin();
      while (true) {
        const st = await cross1RoutineEachFrame();
        if (st === 'finished') break;
      }
      await cross1RoutineEnd();

      await trial1RoutineBegin();
      // trial1 has own EachFrame loop which will immediately finish if k==1
      while (true) {
        const st = await trial1RoutineEachFrame();
        if (st === 'finished' || st === 'abort') break;
      }
      await trial1RoutineEnd();
      // break if k==1 (targets exhausted) — but we check while condition above
    }

    // 5) Loop: trials_2 (block2)
    while (targets1 && targets1.length > 0) {
      await cross1RoutineBegin();
      while (true) {
        const st = await cross1RoutineEachFrame();
        if (st === 'finished') break;
      }
      await cross1RoutineEnd();

      await trial2RoutineBegin();
      while (true) {
        const st = await trial2RoutineEachFrame();
        if (st === 'finished' || st === 'abort') break;
      }
      await trial2RoutineEnd();
    }

    // 6) Wait routine (show "saving data")
    await waitRoutineBegin();
    // show 'wait' while we send data
    text_3.setAutoDraw(true);
    psychoJS.window.flip();

    // 7) Send data to DataPipe
    try {
      await sendDataToDataPipe({ experimentID: '1aALn2OO9S9P' }); // <-- замените на ваш experimentID
    } catch (err) {
      console.error('Error sending data to DataPipe (main):', err);
      // Заканчиваем эксперимент даже при ошибке
      psychoJS.quit({ message: 'Experiment finished (data send failed)', isCompleted: false });
    }

    // 8) End routine (тело может не показываться, так как мы уже quit в sendDataToDataPipe)
    await endRoutineBegin();
    while (true) {
      const st = await endRoutineEachFrame();
      if (st === 'finished') break;
    }
    await endRoutineEnd();

  } catch (err) {
    console.error('Fatal error in main experiment flow:', err);
    psychoJS.quit({ message: 'Experiment aborted due to error', isCompleted: false });
  }
})();







