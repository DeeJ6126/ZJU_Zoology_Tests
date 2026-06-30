const fs = require('fs');
const path = require('path');

const data = {
  generatedAt: "2026-06-30T00:00:00.000000",
  totalQuestions: 56,
  categories: [],
  questions: []
};

const catTemplates = [
  ["protozoa", "原生动物门"],
  ["porifera", "海绵动物门"],
  ["coelenterata", "腔肠动物门"],
  ["platyhelminthes", "扁形动物门"],
  ["nematoda", "线虫动物门"],
  ["annelida", "环节动物门"],
  ["mollusca", "软体动物门"],
];

const typeInfo = [
  ["translation", "名词解释", 2],
  ["choice", "选择题", 2],
  ["true-false", "判断题", 2],
  ["essay", "论述题", 2],
];

for (const [slug, title] of catTemplates) {
  for (const [t, parent, count] of typeInfo) {
    data.categories.push({
      id: `${slug}-${t}`,
      type: t,
      title: title,
      parentTitle: parent,
      questionCount: count
    });
  }
}

const questions = [
  {id:"tr-pz-001",type:"translation",categoryTitle:"原生动物门",categoryId:"protozoa-translation",number:1,prompt:"请解释什么是原生动物的"伸缩泡"（contractile vacuole）及其功能。",referenceAnswer:"伸缩泡是原生动物体内的一种细胞器，主要功能是调节细胞内水分平衡（渗透压调节）。生活在淡水中的原生动物（如草履虫），由于体内渗透压高于外界环境，水分会不断渗入细胞内。伸缩泡通过周期性收缩，将多余的水分和代谢废物排出体外，维持细胞内环境的稳定。"},
  {id:"tr-pz-002",type:"translation",categoryTitle:"原生动物门",categoryId:"protozoa-translation",number:2,prompt:"请解释什么是"伪足"（pseudopodium）及其在原生动物中的功能。",referenceAnswer:"伪足是原生动物（如变形虫）临时形成的细胞质突起，由细胞质流动和微丝骨架的重组驱动。伪足的主要功能包括：（1）运动——通过伪足的伸缩和细胞质流动使虫体移动（变形运动）；（2）摄食——包围食物颗粒形成食物泡，进行胞吞作用（吞噬作用）。"},
  {id:"tr-sp-001",type:"translation",categoryTitle:"海绵动物门",categoryId:"porifera-translation",number:1,prompt:"请解释海绵动物的"水沟系"（canal system）及其功能。",referenceAnswer:"水沟系是海绵动物特有的水流通道系统，由入水孔、中央腔和出水孔组成。其功能是通过领鞭毛细胞的鞭毛摆动产生定向水流，使水流经身体，从而完成滤食（捕获水中的食物颗粒）、呼吸（气体交换）和排泄等生命活动。"},
  {id:"tr-sp-002",type:"translation",categoryTitle:"海绵动物门",categoryId:"porifera-translation",number:2,prompt:"请解释海绵动物的"芽球"（gemmule）及其生物学意义。",referenceAnswer:"芽球是淡水海绵在不良环境下形成的休眠结构，由一群原细胞外包以坚硬的几丁质外壳和骨针构成。待环境好转时萌发成为新海绵个体。芽球是海绵动物进行无性繁殖和抵抗不良环境的重要适应方式。"},
  {id:"tr-cl-001",type:"translation",categoryTitle:"腔肠动物门",categoryId:"coelenterata-translation",number:1,prompt:"请解释腔肠动物的"刺细胞"（cnidocyte）及其功能。",referenceAnswer:"刺细胞是腔肠动物（刺胞动物）特有的攻击和防御细胞。刺细胞内含有刺丝囊，囊内盘绕着带毒的刺丝。当受到刺激时，刺丝囊会瞬间外翻弹出刺丝，将毒液注入敌人体内，用于捕食和防御。"},
  {id:"tr-cl-002",type:"translation",categoryTitle:"腔肠动物门",categoryId:"coelenterata-translation",number:2,prompt:"请解释腔肠动物的"世代交替"。",referenceAnswer:"世代交替是指腔肠动物生活史中无性生殖的水螅型（polyp）和有性生殖的水母型（medusa）有规律交替出现的现象。水螅型通过出芽进行无性生殖；水母型产生精子和卵子进行有性生殖。"},
  {id:"tr-pl-001",type:"translation",categoryTitle:"扁形动物门",categoryId:"platyhelminthes-translation",number:1,prompt:"请解释扁形动物的"原肾管"（protonephridium）及其功能。",referenceAnswer:"原肾管是扁形动物的排泄和渗透压调节器官，由分支的管道系统和末端的焰细胞（flame cell）组成。焰细胞内有纤毛束，纤毛摆动产生负压驱使组织中的液体流入管道系统排出体外。"},
  {id:"tr-pl-002",type:"translation",categoryTitle:"扁形动物门",categoryId:"platyhelminthes-translation",number:2,prompt:"请解释猪带绦虫的"囊尾蚴"（cysticercus）及其感染途径。",referenceAnswer:"囊尾蚴是猪带绦虫的幼虫期，寄生于中间宿主的肌肉等组织中。人误食含有囊尾蚴的生猪肉后，囊尾蚴在人体小肠内发育为成虫。若人误食虫卵，可能在人体内发育为囊尾蚴导致囊虫病。"},
  {id:"tr-nm-001",type:"translation",categoryTitle:"线虫动物门",categoryId:"nematoda-translation",number:1,prompt:"请解释线虫动物门的"假体腔"（pseudocoelom）及其特点。",referenceAnswer:"假体腔是线虫动物等具有的一种原始体腔，由胚胎期的囊胚腔发育而来，体壁中胚层与内胚层之间没有中胚层形成的体腔膜覆盖。假体腔内充满体腔液，起到支撑身体和运输物质的作用。"},
  {id:"tr-nm-002",type:"translation",categoryTitle:"线虫动物门",categoryId:"nematoda-translation",number:2,prompt:"请解释蛔虫的生活史及其感染途径。",referenceAnswer:"蛔虫成虫在小肠内产卵，卵随粪便排出体外。受精卵在外界发育为感染期卵。人误食感染期卵后，幼虫在小肠内孵出，钻入肠壁随血液循环经肝脏、右心到达肺部，在肺内发育后沿气管至咽部，被吞咽回小肠发育为成虫。"},
  {id:"tr-an-001",type:"translation",categoryTitle:"环节动物门",categoryId:"annelida-translation",number:1,prompt:"请解释环节动物"同律分节"的含义。",referenceAnswer:"同律分节是指环节动物身体由多个相似的体节沿前后轴重复排列的现象。每个体节内部具有相似的肌肉、神经节、排泄器官等结构。同律分节使身体运动更加灵活高效。"},
  {id:"tr-an-002",type:"translation",categoryTitle:"环节动物门",categoryId:"annelida-translation",number:2,prompt:"请解释蚯蚓的"环带"（clitellum）及其功能。",referenceAnswer:"环带（生殖带）是蚯蚓体前部一段颜色较深的体节区域。环带分泌黏液形成黏液管，保护交配过程中交换的精子，并在卵产出后形成卵茧（cocoon），为受精卵的发育提供保护。"},
  {id:"tr-mo-001",type:"translation",categoryTitle:"软体动物门",categoryId:"mollusca-translation",number:1,prompt:"请解释软体动物的"外套膜"（mantle）及其功能。",referenceAnswer:"外套膜是软体动物身体背侧的一层薄膜组织。主要功能包括：（1）分泌贝壳；（2）形成呼吸腔（外套腔）；（3）感觉功能。"},
  {id:"tr-mo-002",type:"translation",categoryTitle:"软体动物门",categoryId:"mollusca-translation",number:2,prompt:"请解释软体动物的"齿舌"（radula）及其功能。",referenceAnswer:"齿舌是软体动物（除双壳纲外）特有的摄食器官，位于口腔底部，由多排细小的几丁质齿组成。齿舌通过肌肉伸缩前后刮擦食物，是软体动物分类的重要依据。"},
  {id:"ch-pz-001",type:"choice",categoryTitle:"原生动物门",categoryId:"protozoa-choice",number:1,prompt:"下列哪种原生动物以有性生殖（接合生殖）著称？",options:[{key:"A",text:"变形虫（Amoeba）"},{key:"B",text:"草履虫（Paramecium）"},{key:"C",text:"眼虫（Euglena）"},{key:"D",text:"疟原虫（Plasmodium）"}],answerKey:"B",explanation:"草履虫具有独特的接合生殖方式。"},
  {id:"ch-pz-002",type:"choice",categoryTitle:"原生动物门",categoryId:"protozoa-choice",number:2,prompt:"疟原虫的中间宿主和终末宿主分别是？",options:[{key:"A",text:"人为终末宿主，蚊为中间宿主"},{key:"B",text:"蚊为终末宿主，人为中间宿主"},{key:"C",text:"蚊和人均为终末宿主"},{key:"D",text:"蚊和人均为中间宿主"}],answerKey:"B",explanation:"人是中间宿主，蚊是终末宿主。"},
  {id:"ch-sp-001",type:"choice",categoryTitle:"海绵动物门",categoryId:"porifera-choice",number:1,prompt:"海绵动物胚胎发育中的"翻转现象"发生在哪个阶段？",options:[{key:"A",text:"囊胚期"},{key:"B",text:"原肠胚期"},{key:"C",text:"两囊幼虫期"},{key:"D",text:"浮浪幼虫期"}],answerKey:"C",explanation:"两囊幼虫在水中游泳后，后端具鞭毛的细胞向内翻入，前端无鞭毛的细胞翻到外面，称为翻转现象。"},
  {id:"ch-sp-002",type:"choice",categoryTitle:"海绵动物门",categoryId:"porifera-choice",number:2,prompt:"构成海绵动物骨骼的主要成分不包括以下哪项？",options:[{key:"A",text:"钙质骨针"},{key:"B",text:"硅质骨针"},{key:"C",text:"角质骨针"},{key:"D",text:"海绵丝"}],answerKey:"C",explanation:"不存在"角质骨针"这一分类。骨针分为钙质骨针和硅质骨针。"},
  {id:"ch-cl-001",type:"choice",categoryTitle:"腔肠动物门",categoryId:"coelenterata-choice",number:1,prompt:"腔肠动物的神经系统属于哪种类型？",options:[{key:"A",text:"梯状神经系统"},{key:"B",text:"链状神经系统"},{key:"C",text:"网状神经系统"},{key:"D",text:"管状神经系统"}],answerKey:"C",explanation:"腔肠动物具有弥散性的网状神经系统。"},
  {id:"ch-cl-002",type:"choice",categoryTitle:"腔肠动物门",categoryId:"coelenterata-choice",number:2,prompt:"水母的感觉器官是？",options:[{key:"A",text:"触手囊"},{key:"B",text:"眼点"},{key:"C",text:"平衡囊"},{key:"D",text:"侧线"}],answerKey:"C",explanation:"水母的伞缘具有平衡囊（statocyst），维持身体平衡。"},
  {id:"ch-pl-001",type:"choice",categoryTitle:"扁形动物门",categoryId:"platyhelminthes-choice",number:1,prompt:"下列哪项不是扁形动物的主要特征？",options:[{key:"A",text:"身体扁平，两侧对称"},{key:"B",text:"具有真正的体腔"},{key:"C",text:"三胚层发育"},{key:"D",text:"无肛门"}],answerKey:"B",explanation:"扁形动物无体腔，具有真正体腔的动物从环节动物开始。"},
  {id:"ch-pl-002",type:"choice",categoryTitle:"扁形动物门",categoryId:"platyhelminthes-choice",number:2,prompt:"肝片吸虫的第一中间宿主是？",options:[{key:"A",text:"钉螺"},{key:"B",text:"椎实螺"},{key:"C",text:"扁卷螺"},{key:"D",text:"川蜷螺"}],answerKey:"B",explanation:"肝片吸虫的第一中间宿主是椎实螺（Lymnaea）。"},
  {id:"ch-nm-001",type:"choice",categoryTitle:"线虫动物门",categoryId:"nematoda-choice",number:1,prompt:"线虫动物与扁形动物相比最重要的进步特征是？",options:[{key:"A",text:"出现了假体腔"},{key:"B",text:"具有真正的体节"},{key:"C",text:"具有闭管式循环系统"},{key:"D",text:"具有后肾管"}],answerKey:"A",explanation:"线虫动物首次出现了假体腔，这是从无体腔到具有体腔的重要进化。"},
  {id:"ch-nm-002",type:"choice",categoryTitle:"线虫动物门",categoryId:"nematoda-choice",number:2,prompt:"丝虫的传播媒介是？",options:[{key:"A",text:"按蚊"},{key:"B",text:"库蚊"},{key:"C",text:"白蛉"},{key:"D",text:"蚋"}],answerKey:"B",explanation:"班氏丝虫由库蚊（Culex）传播。"},
  {id:"ch-an-001",type:"choice",categoryTitle:"环节动物门",categoryId:"annelida-choice",number:1,prompt:"蚯蚓的排泄器官是？",options:[{key:"A",text:"原肾管"},{key:"B",text:"后肾管"},{key:"C",text:"马氏管"},{key:"D",text:"触角腺"}],answerKey:"B",explanation:"蚯蚓具有后肾管（metanephridium）。"},
  {id:"ch-an-002",type:"choice",categoryTitle:"环节动物门",categoryId:"annelida-choice",number:2,prompt:"下列哪种动物不属于环节动物门？",options:[{key:"A",text:"沙蚕"},{key:"B",text:"蚂蟥"},{key:"C",text:"蚯蚓"},{key:"D",text:"钩虫"}],answerKey:"D",explanation:"钩虫属于线虫动物门。"},
  {id:"ch-mo-001",type:"choice",categoryTitle:"软体动物门",categoryId:"mollusca-choice",number:1,prompt:"软体动物中具有闭管式循环系统的是哪一纲？",options:[{key:"A",text:"腹足纲"},{key:"B",text:"双壳纲"},{key:"C",text:"头足纲"},{key:"D",text:"多板纲"}],answerKey:"C",explanation:"头足纲（如乌贼、章鱼）具有闭管式循环系统。"},
  {id:"ch-mo-002",type:"choice",categoryTitle:"软体动物门",categoryId:"mollusca-choice",number:2,prompt:"河蚌驱动水流的器官是？",options:[{key:"A",text:"外套膜上的纤毛"},{key:"B",text:"鳃上的纤毛"},{key:"C",text:"斧足的收缩"},{key:"D",text:"入水管和出水管"}],answerKey:"B",explanation:"双壳纲依靠鳃上皮纤毛摆动产生定向水流。"},
  {id:"tf-pz-001",type:"true-false",categoryTitle:"原生动物门",categoryId:"protozoa-true-false",number:1,prompt:"所有原生动物都是单细胞动物，但一个细胞便能完成一切生理功能。",answerIsTrue:true,explanation:"原生动物是单细胞动物，细胞质已分化为各种细胞器执行不同生理功能。"},
  {id:"tf-pz-002",type:"true-false",categoryTitle:"原生动物门",categoryId:"protozoa-true-false",number:2,prompt:"疟原虫的生活史中只需要一个宿主即可完成全部发育过程。",answerIsTrue:false,explanation:"疟原虫需要两个宿主交替完成生活史：人体和蚊体。"},
  {id:"tf-sp-001",type:"true-false",categoryTitle:"海绵动物门",categoryId:"porifera-true-false",number:1,prompt:"海绵动物虽然有多种细胞，但尚未形成真正的组织。",answerIsTrue:true,explanation:"海绵动物的细胞虽然有分化，但细胞之间连接松散，尚未形成真正的组织。"},
  {id:"tf-sp-002",type:"true-false",categoryTitle:"海绵动物门",categoryId:"porifera-true-false",number:2,prompt:"海绵动物全部生活在海洋环境中。",answerIsTrue:false,explanation:"少数淡水海绵生活在淡水中。"},
  {id:"tf-cl-001",type:"true-false",categoryTitle:"腔肠动物门",categoryId:"coelenterata-true-false",number:1,prompt:"水螅型和水母型均为腔肠动物生活史中可能出现的形式。",answerIsTrue:true,explanation:"许多腔肠动物生活史中存在世代交替。"},
  {id:"tf-cl-002",type:"true-false",categoryTitle:"腔肠动物门",categoryId:"coelenterata-true-false",number:2,prompt:"珊瑚虫属于水螅纲。",answerIsTrue:false,explanation:"珊瑚虫属于珊瑚纲（Anthozoa）。"},
  {id:"tf-pl-001",type:"true-false",categoryTitle:"扁形动物门",categoryId:"platyhelminthes-true-false",number:1,prompt:"扁形动物是有口无肛门的动物。",answerIsTrue:true,explanation:"扁形动物具有不完全消化管。"},
  {id:"tf-pl-002",type:"true-false",categoryTitle:"扁形动物门",categoryId:"platyhelminthes-true-false",number:2,prompt:"猪带绦虫的成体寄生于猪的肌肉组织中。",answerIsTrue:false,explanation:"猪带绦虫的成虫寄生于人体小肠。"},
  {id:"tf-nm-001",type:"true-false",categoryTitle:"线虫动物门",categoryId:"nematoda-true-false",number:1,prompt:"线虫动物具有假体腔和完全的消化管（有口有肛门）。",answerIsTrue:true,explanation:"线虫动物首次进化出假体腔和完全消化管。"},
  {id:"tf-nm-002",type:"true-false",categoryTitle:"线虫动物门",categoryId:"nematoda-true-false",number:2,prompt:"蛔虫的体壁肌肉为平滑肌。",answerIsTrue:false,explanation:"蛔虫的体壁肌肉是斜纹肌。"},
  {id:"tf-an-001",type:"true-false",categoryTitle:"环节动物门",categoryId:"annelida-true-false",number:1,prompt:"蚯蚓的血液循环为闭管式循环。",answerIsTrue:true,explanation:"蚯蚓具有闭管式循环系统。"},
  {id:"tf-an-002",type:"true-false",categoryTitle:"环节动物门",categoryId:"annelida-true-false",number:2,prompt:"所有环节动物都有刚毛。",answerIsTrue:false,explanation:"蛭纲（如蚂蟥）无刚毛。"},
  {id:"tf-mo-001",type:"true-false",categoryTitle:"软体动物门",categoryId:"mollusca-true-false",number:1,prompt:"软体动物大多具有贝壳，贝壳由外套膜分泌形成。",answerIsTrue:true,explanation:"贝壳由外套膜上皮细胞分泌形成。"},
  {id:"tf-mo-002",type:"true-false",categoryTitle:"软体动物门",categoryId:"mollusca-true-false",number:2,prompt:"所有软体动物都是雌雄异体。",answerIsTrue:false,explanation:"腹足纲的许多种类是雌雄同体。"},
  {id:"es-pz-001",type:"essay",categoryTitle:"原生动物门",categoryId:"protozoa-essay",number:1,prompt:"试述原生动物的主要特征及其在动物进化中的地位。",referenceAnswer:"## 主要特征\n\n1. 单细胞性\n2. 形体微小\n3. 运动方式多样：伪足、鞭毛、纤毛\n4. 生殖方式丰富\n\n## 进化地位\n\n原生动物是动物界中最原始的动物，是单细胞动物的代表。"},
  {id:"es-pz-002",type:"essay",categoryTitle:"原生动物门",categoryId:"protozoa-essay",number:2,prompt:"比较草履虫和变形虫在运动和摄食方式上的主要区别。",referenceAnswer:"## 运动\n\n- 草履虫：纤毛旋转前进\n- 变形虫：伪足变形运动\n\n## 摄食\n\n- 草履虫：口沟纤毛形成水流送入口中\n- 变形虫：伪足包围形成食物泡"},
  {id:"es-sp-001",type:"essay",categoryTitle:"海绵动物门",categoryId:"porifera-essay",number:1,prompt:"试述为什么海绵动物被称为"侧生动物"。",referenceAnswer:"海绵动物被称为侧生动物，因为它们在多细胞动物进化中处于侧枝地位。原始性体现在：细胞水平（未形成真正组织）、无消化腔、无神经系统、胚胎发育特殊、再生能力强。"},
  {id:"es-sp-002",type:"essay",categoryTitle:"海绵动物门",categoryId:"porifera-essay",number:2,prompt:"描述海绵动物的水沟系类型及其进化趋势。",referenceAnswer:"## 三种类型\n\n1. 单沟型：最简单\n2. 双沟型：体壁增厚\n3. 复沟型：最复杂\n\n## 进化趋势\n\n单沟型→双沟型→复沟型：滤食效率不断提高。"},
  {id:"es-cl-001",type:"essay",categoryTitle:"腔肠动物门",categoryId:"coelenterata-essay",number:1,prompt:"试述腔肠动物的体制特征及其进化意义。",referenceAnswer:"## 体制特征\n\n1. 辐射对称\n2. 两胚层\n3. 消化循环腔\n4. 网状神经系统\n5. 刺细胞\n\n## 进化意义\n\n真正的后生动物的开始。"},
  {id:"es-cl-002",type:"essay",categoryTitle:"腔肠动物门",categoryId:"coelenterata-essay",number:2,prompt:"比较水螅纲、钵水母纲和珊瑚纲的主要区别。",referenceAnswer:"## 水螅纲\n多世代交替，水母型有缘膜，生殖细胞来源于外胚层。\n\n## 钵水母纲\n以水母型为主，无缘膜，生殖细胞来源于内胚层。\n\n## 珊瑚纲\n只有水螅型，隔膜发达。"},
  {id:"es-pl-001",type:"essay",categoryTitle:"扁形动物门",categoryId:"platyhelminthes-essay",number:1,prompt:"试述扁形动物门的主要特征及其在动物进化中的地位。",referenceAnswer:"## 主要特征\n\n1. 两侧对称\n2. 三胚层\n3. 无体腔\n4. 不完全消化管\n5. 梯状神经系统\n\n## 进化地位\n\n两侧对称和三胚层是动物进化史上的重大事件。"},
  {id:"es-pl-002",type:"essay",categoryTitle:"扁形动物门",categoryId:"platyhelminthes-essay",number:2,prompt:"比较吸虫纲和绦虫纲在形态结构上的适应性变化。",referenceAnswer:"## 吸虫纲\n有口吸盘和腹吸盘，有不完全消化管。\n\n## 绦虫纲\n由头节、颈部和节片组成，无消化管。\n\n两者均具有发达的生殖系统。"},
  {id:"es-nm-001",type:"essay",categoryTitle:"线虫动物门",categoryId:"nematoda-essay",number:1,prompt:"试述假体腔的出现有何进化意义？",referenceAnswer:"## 进化意义\n\n1. 流体静力骨骼\n2. 物质运输\n3. 器官发展空间\n\n## 线虫特点\n\n角质层、仅纵肌、完全消化管。"},
  {id:"es-nm-002",type:"essay",categoryTitle:"线虫动物门",categoryId:"nematoda-essay",number:2,prompt:"比较线虫动物与环节动物在体壁结构和运动方式上的差异。",referenceAnswer:"## 体壁\n\n- 线虫：厚角质层+仅纵肌\n- 环节：薄角质层+环肌+纵肌\n\n## 运动\n\n- 线虫：仅弯曲摆动\n- 环节：蠕动运动"},
  {id:"es-an-001",type:"essay",categoryTitle:"环节动物门",categoryId:"annelida-essay",number:1,prompt:"试述环节动物分节现象和真体腔的出现有何进化意义？",referenceAnswer:"## 分节的意义\n\n运动效率提高、灵活性增强、功能分化基础。\n\n## 真体腔的意义\n\n高效流体静力骨骼、消化管独立运动。"},
  {id:"es-an-002",type:"essay",categoryTitle:"环节动物门",categoryId:"annelida-essay",number:2,prompt:"比较多毛纲、寡毛纲和蛭纲的主要区别。",referenceAnswer:"## 多毛纲\n海洋生活，有疣足和刚毛。\n\n## 寡毛纲\n陆生，刚毛较少，有环带。\n\n## 蛭纲\n半寄生，无刚毛，有吸盘。"},
  {id:"es-mo-001",type:"essay",categoryTitle:"软体动物门",categoryId:"mollusca-essay",number:1,prompt:"试述软体动物门的主要特征和分类概况。",referenceAnswer:"## 主要特征\n\n身体分区（头、足、内脏团、外套膜）、贝壳、齿舌、开管式循环。\n\n## 各纲\n\n腹足纲、双壳纲、头足纲、多板纲等。"},
  {id:"es-mo-002",type:"essay",categoryTitle:"软体动物门",categoryId:"mollusca-essay",number:2,prompt:"试述软体动物与人类的关系。",referenceAnswer:"## 有益\n\n食用（鲍鱼、牡蛎等）、工业（珍珠）、科研。\n\n## 有害\n\n农业害虫、传播疾病（钉螺传播血吸虫）、船蛆破坏木船。"},
];

data.questions = questions;
data.totalQuestions = questions.length;

const outPath = 'E:/Zoology/ZJU_Zoology_Tests/public/question-bank.json';
fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf-8');
console.log(`Created ${outPath} with ${questions.length} questions across ${data.categories.length} categories`);
