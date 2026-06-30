const fs = require('fs');

const cats = [];
const slugs = [
  ['protozoa', '原生动物门'],
  ['porifera', '海绵动物门'],
  ['coelenterata', '腔肠动物门'],
  ['platyhelminthes', '扁形动物门'],
  ['nematoda', '线虫动物门'],
  ['annelida', '环节动物门'],
  ['mollusca', '软体动物门'],
];
const types = [
  ['translation', '名词解释', 2],
  ['choice', '选择题', 2],
  ['true-false', '判断题', 2],
  ['essay', '论述题', 2],
];

for (const [s, t] of slugs) {
  for (const [ti, tt, tc] of types) {
    cats.push({ id: s + '-' + ti, type: ti, title: t, parentTitle: tt, questionCount: tc });
  }
}

const qs = [];

function tr(id, catTitle, catId, num, prompt, ans) {
  qs.push({ id, type: 'translation', categoryTitle: catTitle, categoryId: catId, number: num, prompt, referenceAnswer: ans });
}
function mc(id, catTitle, catId, num, prompt, opts, ans, exp) {
  qs.push({ id, type: 'choice', categoryTitle: catTitle, categoryId: catId, number: num, prompt, options: opts, answerKey: ans, explanation: exp });
}
function tf(id, catTitle, catId, num, prompt, ans, exp) {
  qs.push({ id, type: 'true-false', categoryTitle: catTitle, categoryId: catId, number: num, prompt, answerIsTrue: ans, explanation: exp });
}
function es(id, catTitle, catId, num, prompt, ans) {
  qs.push({ id, type: 'essay', categoryTitle: catTitle, categoryId: catId, number: num, prompt, referenceAnswer: ans });
}

const a = '原生动物门';
const b = '海绵动物门';
const c = '腔肠动物门';
const d = '扁形动物门';
const e = '线虫动物门';
const f = '环节动物门';
const g = '软体动物门';

tr('tr-pz-001', a, 'protozoa-translation', 1,
  '请解释什么是原生动物的伸缩泡(contractile vacuole)及其功能。',
  '伸缩泡是原生动物体内的一种细胞器，主要功能是调节细胞内水分平衡。生活在淡水中的原生动物(如草屡虫)，由于体内渗透压高于外界环境，水分会不断渗入细胞内。伸缩泡通过周期性收缩，将多余的水分和代谢废物排出体外。');

tr('tr-pz-002', a, 'protozoa-translation', 2,
  '请解释什么是伪足(pseudopodium)及其在原生动物中的功能。',
  '伪足是原生动物(如变形虫)临时形成的细胞质突起。主要功能包括：(1)运动——通过伪足的伸缩使虫体移动；(2)摄食——包围食物颗粒形成食物泡进行胞吞作用。');

tr('tr-sp-001', b, 'porifera-translation', 1,
  '请解释海绵动物的水沟系(canal system)及其功能。',
  '水沟系是海绵动物特有的水流通道系统，由入水孔、中央腔和出水孔组成。通过领鞭毛细胞的鞭毛摆动产生定向水流，完成滤食、呼吸和排泄。');

tr('tr-sp-002', b, 'porifera-translation', 2,
  '请解释海绵动物的芽球(gemmule)及其生物学意义。',
  '芽球是淡水海绵在不良环境下形成的休眠结构，由原细胞外包几丁质外壳和骨针构成。环境好转时萌发成为新海绵个体。');

tr('tr-cl-001', c, 'coelenterata-translation', 1,
  '请解释腔肠动物的刺细胞(cnidocyte)及其功能。',
  '刺细胞是腔肠动物特有的攻击和防御细胞，内含刺丝囊。当受到刺激时，刺丝囊瞬间外翻弹出刺丝，将毒液注入敌人体内，用于捕食和防御。');

tr('tr-cl-002', c, 'coelenterata-translation', 2,
  '请解释腔肠动物的世代交替。',
  '世代交替是指腔肠动物生活史中无性生殖的水螥型(polyp)和有性生殖的水母型(medusa)有规律交替出现的现象。');

tr('tr-pl-001', d, 'platyhelminthes-translation', 1,
  '请解释扁形动物的原肾管(protonephridium)及其功能。',
  '原肾管是扁形动物的排泄和渗透压调节器官，由管道系统和末端的焰细胞(flame cell)组成。焰细胞内纺毛摆动产生负压迫使液体流入管道排出体外。');

tr('tr-pl-002', d, 'platyhelminthes-translation', 2,
  '请解释猪带绵虫的囊尾骰(cysticercus)及其感染途径。',
  '囊尾骰是猪带绵虫的幼虫期，寄生于中间宿主的肌肉中。人误食含囊尾骰的生猪肉后，囊尾骰在人体小肠内发育为成虫。');

tr('tr-nm-001', e, 'nematoda-translation', 1,
  '请解释线虫动物门的假体腔(pseudocoelom)及其特点。',
  '假体腔是线虫动物具有的原始体腔，由囊胞腔发育而来。体壁中胞层与内胞层之间没有体腔膜覆盖，腔内充满体腔液，起到支撑和运输作用。');

tr('tr-nm-002', e, 'nematoda-translation', 2,
  '请解释蛔虫的生活史及其感染途径。',
  '成虫在小肠产卵，卵随粪便排出。受精卵在外界发育为感染期卵。人误食后幼虫在小肠孵出，钻入肠壁经血液循环到肺部，发育后沿气管至咽部，被吞咽回小肠发育为成虫。');

tr('tr-an-001', f, 'annelida-translation', 1,
  '请解释环节动物同律分节的含义。',
  '同律分节是指环节动物身体由多个相似体节沿前后轴重复排列的现象。每个体节有相似的肌肉、神经节、排泄器官等结构，使运动更加灵活高效。');

tr('tr-an-002', f, 'annelida-translation', 2,
  '请解释蚯蚓的环带(clitellum)及其功能。',
  '环带(生殖带)是蚯蚓体前部颜色较深的体节区域。分泌黏液形成黏液管保护精子，并在卵产出后形成卵茧(cocoon)。');

tr('tr-mo-001', g, 'mollusca-translation', 1,
  '请解释软体动物的外套膜(mantle)及其功能。',
  '外套膜是软体动物身体背侧的薄膜组织。主要功能包括：(1)分泌贝壳；(2)形成呼吸腔(外套腔)；(3)感觉功能。');

tr('tr-mo-002', g, 'mollusca-translation', 2,
  '请解释软体动物的齿舌(radula)及其功能。',
  '齿舌是软体动物(除双壳纲外)特有的摄食器官，由多排几丁质齿组成。通过肌肉伸缩前后刮擦食物，是软体动物分类的重要依据。');

mc('ch-pz-001', a, 'protozoa-choice', 1,
  '下列哪种原生动物以有性生殖(接合生殖)著称？',
  [{key:'A',text:'变形虫'},{key:'B',text:'草屡虫'},{key:'C',text:'眼虫'},{key:'D',text:'疟原虫'}],
  'B', '草屡虫具有独特的接合生殖方式。');

mc('ch-pz-002', a, 'protozoa-choice', 2,
  '疟原虫的中间宿主和终末宿主分别是？',
  [{key:'A',text:'人为终末宿主，蚊为中间宿主'},{key:'B',text:'蚊为终末宿主，人为中间宿主'},{key:'C',text:'蚊和人均为终末宿主'},{key:'D',text:'蚊和人均为中间宿主'}],
  'B', '人是中间宿主，蚊是终末宿主。');

mc('ch-sp-001', b, 'porifera-choice', 1,
  '海绵动物胚胎发育中的翻转现象发生在哪个阶段？',
  [{key:'A',text:'囊胞期'},{key:'B',text:'原肠胞期'},{key:'C',text:'两囊幼虫期'},{key:'D',text:'浮浪幼虫期'}],
  'C', '两囊幼虫游泳后后端的鞭毛细胞向内翻入称为翻转现象。');

mc('ch-sp-002', b, 'porifera-choice', 2,
  '构成海绵动物骨骼的主要成分不包括以下哪项？',
  [{key:'A',text:'钙质骨针'},{key:'B',text:'硅质骨针'},{key:'C',text:'角质骨针'},{key:'D',text:'海绵丝'}],
  'C', '不存在角质骨针这一分类。');

mc('ch-cl-001', c, 'coelenterata-choice', 1,
  '腔肠动物的神经系统属于哪种类型？',
  [{key:'A',text:'梯状神经系统'},{key:'B',text:'链状神经系统'},{key:'C',text:'网状神经系统'},{key:'D',text:'管状神经系统'}],
  'C', '腔肠动物具有弥散性的网状神经系统。');

mc('ch-cl-002', c, 'coelenterata-choice', 2,
  '水母的感觉器官是？',
  [{key:'A',text:'触手囊'},{key:'B',text:'眼点'},{key:'C',text:'平衡囊'},{key:'D',text:'侧线'}],
  'C', '水母的伞缘具有平衡囊(statocyst)。');

mc('ch-pl-001', d, 'platyhelminthes-choice', 1,
  '下列哪项不是扁形动物的主要特征？',
  [{key:'A',text:'身体扁平，两侧对称'},{key:'B',text:'具有真正的体腔'},{key:'C',text:'三胞层发育'},{key:'D',text:'无肛门'}],
  'B', '扁形动物无体腔。');

mc('ch-pl-002', d, 'platyhelminthes-choice', 2,
  '肝片吸虫的第一中间宿主是？',
  [{key:'A',text:'钉螺'},{key:'B',text:'椎实螺'},{key:'C',text:'扁卷螺'},{key:'D',text:'川蠕螺'}],
  'B', '肝片吸虫的第一中间宿主是椎实螺(Lymnaea)。');

mc('ch-nm-001', e, 'nematoda-choice', 1,
  '线虫动物与扁形动物相比最重要的进步特征是？',
  [{key:'A',text:'出现了假体腔'},{key:'B',text:'具有真正的体节'},{key:'C',text:'具有闭管式循环系统'},{key:'D',text:'具有后肾管'}],
  'A', '线虫动物首次出现了假体腔。');

mc('ch-nm-002', e, 'nematoda-choice', 2,
  '丝虫的传播媒介是？',
  [{key:'A',text:'按蚊'},{key:'B',text:'库蚊'},{key:'C',text:'白蚉'},{key:'D',text:'蛋'}],
  'B', '班氏丝虫由库蚊(Culex)传播。');

mc('ch-an-001', f, 'annelida-choice', 1,
  '蚯蚓的排泄器官是？',
  [{key:'A',text:'原肾管'},{key:'B',text:'后肾管'},{key:'C',text:'马氏管'},{key:'D',text:'触角腺'}],
  'B', '蚯蚓具有后肾管(metanephridium)。');

mc('ch-an-002', f, 'annelida-choice', 2,
  '下列哪种动物不属于环节动物门？',
  [{key:'A',text:'沙蚕'},{key:'B',text:'蚂蚉'},{key:'C',text:'蚯蚓'},{key:'D',text:'钩虫'}],
  'D', '钩虫属于线虫动物门。');

mc('ch-mo-001', g, 'mollusca-choice', 1,
  '软体动物中具有闭管式循环系统的是哪一纲？',
  [{key:'A',text:'腹足纲'},{key:'B',text:'双壳纲'},{key:'C',text:'头足纲'},{key:'D',text:'多板纲'}],
  'C', '头足纲(如乌贼、章鱼)具有闭管式循环系统。');

mc('ch-mo-002', g, 'mollusca-choice', 2,
  '河珍驱动水流的器官是？',
  [{key:'A',text:'外套膜上的纺毛'},{key:'B',text:'鳃上的纺毛'},{key:'C',text:'斧足的收缩'},{key:'D',text:'入水管和出水管'}],
  'B', '双壳纲依靠鳃上皮纺毛摆动产生定向水流。');

tf('tf-pz-001', a, 'protozoa-true-false', 1,
  '所有原生动物都是单细胞动物，但一个细胞便能完成一切生理功能。',
  true, '原生动物是单细胞动物，细胞质已分化为各种细胞器。');

tf('tf-pz-002', a, 'protozoa-true-false', 2,
  '疟原虫的生活史中只需要一个宿主即可完成全部发育过程。',
  false, '疟原虫需要人体和蚊体两个宿主。');

tf('tf-sp-001', b, 'porifera-true-false', 1,
  '海绵动物虽然有多种细胞，但尚未形成真正的组织。',
  true, '海绵动物细胞之间连接松散，尚未形成真正组织。');

tf('tf-sp-002', b, 'porifera-true-false', 2,
  '海绵动物全部生活在海洋环境中。',
  false, '少数淡水海绵生活在淡水中。');

tf('tf-cl-001', c, 'coelenterata-true-false', 1,
  '水螥型和水母型均为腔肠动物生活史中可能出现的形式。',
  true, '许多腔肠动物生活史中存在世代交替。');

tf('tf-cl-002', c, 'coelenterata-true-false', 2,
  '珊瑩虫属于水螥纲。',
  false, '珊瑩虫属于珊瑩纲(Anthozoa)。');

tf('tf-pl-001', d, 'platyhelminthes-true-false', 1,
  '扁形动物是有口无肛门的动物。',
  true, '扁形动物具有不完全消化管。');

tf('tf-pl-002', d, 'platyhelminthes-true-false', 2,
  '猪带绵虫的成体寄生于猪的肌肉组织中。',
  false, '成虫寄生于人体小肠。');

tf('tf-nm-001', e, 'nematoda-true-false', 1,
  '线虫动物具有假体腔和完全的消化管(有口有肛门)。',
  true, '线虫动物首次进化出假体腔和完全消化管。');

tf('tf-nm-002', e, 'nematoda-true-false', 2,
  '蛔虫的体壁肌肉为平滑肌。',
  false, '蛔虫的体壁肌肉是斜纹肌。');

tf('tf-an-001', f, 'annelida-true-false', 1,
  '蚯蚓的血液循环为闭管式循环。',
  true, '蚯蚓具有闭管式循环系统。');

tf('tf-an-002', f, 'annelida-true-false', 2,
  '所有环节动物都有刚毛。',
  false, '蚦纲(如蚂蚉)无刚毛。');

tf('tf-mo-001', g, 'mollusca-true-false', 1,
  '软体动物大多具有贝壳，贝壳由外套膜分泌形成。',
  true, '贝壳由外套膜上皮细胞分泌形成。');

tf('tf-mo-002', g, 'mollusca-true-false', 2,
  '所有软体动物都是雌雄异体。',
  false, '腹足纲的许多种类是雌雄同体。');

es('es-pz-001', a, 'protozoa-essay', 1,
  '试述原生动物的主要特征及其在动物进化中的地位。',
  '主要特征：单细胞性、形体微小、运动方式多样(伪足、鞭毛、纺毛)、生殖方式丰富。\n\n进化地位：原生动物是动物界中最原始的动物，是单细胞动物的代表。');

es('es-pz-002', a, 'protozoa-essay', 2,
  '比较草屡虫和变形虫在运动和摄食方式上的主要区别。',
  '运动方式：草屡虫依靠纺毛旋转前进；变形虫依靠伪足变形运动。\n\n摄食方式：草屡虫通过口沟纺毛形成水流送入口中；变形虫伸出伪足包围食物颗粒。');

es('es-sp-001', b, 'porifera-essay', 1,
  '试述为什么海绵动物被称为侧生动物(Parazoa)。',
  '海绵动物在多细胞动物进化中处于侧枝地位。原始性体现在：未形成真正组织、无消化腔、无神经系统、胚胎发育特殊(翻转现象)、再生能力强。');

es('es-sp-002', b, 'porifera-essay', 2,
  '描述海绵动物的水沟系类型及其进化趋势。',
  '三种类型：单沟型(最简单)、双沟型(体壁增厚)、复沟型(最复杂)。\n\n进化趋势：单沟型→双沟型→复沟型，滤食效率不断提高。');

es('es-cl-001', c, 'coelenterata-essay', 1,
  '试述腔肠动物的体制特征及其在动物进化中的意义。',
  '体制特征：辐射对称、两胞层、消化循环腔、网状神经系统、刺细胞。\n\n进化意义：真正的后生动物的开始。');

es('es-cl-002', c, 'coelenterata-essay', 2,
  '比较水螥纲、钵水母纲和珊瑩纲的主要区别。',
  '水螥纲：多世代交替，水母型有缘膜。\n钵水母纲：以水母型为主，无缘膜。\n珊瑩纲：只有水螥型，隔膜发达。');

es('es-pl-001', d, 'platyhelminthes-essay', 1,
  '试述扁形动物门的主要特征及其在动物进化中的地位。',
  '主要特征：两侧对称、三胞层、无体腔、不完全消化管、梯状神经系统。\n\n进化地位：两侧对称和三胞层是动物进化史上的重大事件。');

es('es-pl-002', d, 'platyhelminthes-essay', 2,
  '比较吸虫纲和绵虫纲在形态结构上的适应性变化。',
  '吸虫纲：有口吸盘和腹吸盘，有不完全消化管。\n\n绵虫纲：由头节、颈部和节片组成，无消化管(通过体壁吸收营养)。');

es('es-nm-001', e, 'nematoda-essay', 1,
  '试述假体腔的出现有何进化意义？以线虫为例说明。',
  '进化意义：流体静力骨骼、物质运输、器官发展空间。\n\n线虫特点：角质层、仅纵肌(斜纹肌)、完全消化管、雌雄异体。');

es('es-nm-002', e, 'nematoda-essay', 2,
  '比较线虫动物与环节动物在体壁结构和运动方式上的主要差异。',
  '体壁结构：线虫为厚角质层+仅纵肌；环节动物为薄角质层+环肌+纵肌。\n\n运动方式：线虫仅弯曲摆动；环节动物为蠕动运动。');

es('es-an-001', f, 'annelida-essay', 1,
  '试述环节动物分节现象和真体腔的出现有何进化意义？',
  '分节意义：运动效率提高、灵活性增强、功能分化基础。\n\n真体腔意义：高效流体静力骨骼、消化管独立运动。');

es('es-an-002', f, 'annelida-essay', 2,
  '比较多毛纲、寡毛纲和蚦纲的主要区别。',
  '多毛纲：海洋生活，有疹足和刚毛。\n寡毛纲：陆生，刚毛较少，有环带。\n蚦纲：半寄生，无刚毛，有吸盘。');

es('es-mo-001', g, 'mollusca-essay', 1,
  '试述软体动物门的主要特征和分类概况。',
  '主要特征：身体分区(头、足、内脏团、外套膜)、贝壳、齿舌、开管式循环。\n\n各纲：腹足纲、双壳纲、头足纲、多板纲等。');

es('es-mo-002', g, 'mollusca-essay', 2,
  '试述软体动物与人类的关系。',
  '有益：食用(鲍鱼、牡蛩等)、工业(珍珠)、科研。\n\n有害：农业害虫、传播疾病(钉螺传播血吸虫)、船蚤破坏木船。');

const data = {
  generatedAt: '2026-06-30T00:00:00.000000',
  totalQuestions: qs.length,
  categories: cats,
  questions: qs,
};

fs.writeFileSync('E:/Zoology/ZJU_Zoology_Tests/public/question-bank.json', JSON.stringify(data, null, 2), 'utf-8');
console.log('Generated question-bank.json with ' + qs.length + ' questions across ' + cats.length + ' categories');
