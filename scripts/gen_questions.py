import json

data = {
    "generatedAt": "2026-06-30T00:00:00.000000",
    "totalQuestions": 0,
    "categories": [],
    "questions": []
}

cat_templates = [
    ("protozoa", "原生动物门"),
    ("porifera", "海绵动物门"),
    ("coelenterata", "腔肠动物门"),
    ("platyhelminthes", "扁形动物门"),
    ("nematoda", "线虫动物门"),
    ("annelida", "环节动物门"),
    ("mollusca", "软体动物门"),
]

type_info = [
    ("translation", "名词解释", 2),
    ("choice", "选择题", 2),
    ("true-false", "判断题", 2),
    ("essay", "论述题", 2),
]

for slug, title in cat_templates:
    for t, parent, count in type_info:
        data["categories"].append({
            "id": f"{slug}-{t}",
            "type": t,
            "title": title,
            "parentTitle": parent,
            "questionCount": count
        })

questions = [
    {"id": "tr-pz-001", "type": "translation", "categoryTitle": "原生动物门", "categoryId": "protozoa-translation", "number": 1, "prompt": "请解释什么是原生动物的“伸缩泡”（contractile vacuole）及其功能。", "referenceAnswer": "伸缩泡是原生动物体内的一种细胞器，主要功能是调节细胞内水分平衡（渗透压调节）。生活在淡水中的原生动物（如草履虫），由于体内渗透压高于外界环境，水分会不断渗入细胞内。伸缩泡通过周期性收缩，将多余的水分和代谢废物排出体外，维持细胞内环境的稳定。"},
    {"id": "tr-pz-002", "type": "translation", "categoryTitle": "原生动物门", "categoryId": "protozoa-translation", "number": 2, "prompt": "请解释什么是“伪足”（pseudopodium）及其在原生动物中的功能。", "referenceAnswer": "伪足是原生动物（如变形虫）临时形成的细胞质突起，由细胞质流动和微丝骨架的重组驱动。伪足的主要功能包括：（1）运动——通过伪足的伸缩和细胞质流动使虫体移动（变形运动）；（2）摄食——包围食物颗粒形成食物泡，进行胞吞作用（吞噬作用）。"},
    {"id": "tr-sp-001", "type": "translation", "categoryTitle": "海绵动物门", "categoryId": "porifera-translation", "number": 1, "prompt": "请解释海绵动物的“水沟系”（canal system）及其功能。", "referenceAnswer": "水沟系是海绵动物特有的水流通道系统，由入水孔、中央腔和出水孔组成。其功能是通过领鞭毛细胞的鞭毛摆动产生定向水流，使水流经身体，从而完成滤食（捕获水中的食物颗粒）、呼吸（气体交换）和排泄等生命活动。水沟系是海绵动物适应固着生活的关键结构。"},
    {"id": "tr-sp-002", "type": "translation", "categoryTitle": "海绵动物门", "categoryId": "porifera-translation", "number": 2, "prompt": "请解释海绵动物的“芽球”（gemmule）及其生物学意义。", "referenceAnswer": "芽球是淡水海绵在不良环境（如冬季、干旱）下形成的休眠结构，由一群原细胞（未分化细胞）外包以坚硬的几丁质外壳和骨针构成。当环境恶化时母体死亡，但芽球能存活下来，待环境好转时萌发成为新海绵个体。芽球是海绵动物进行无性繁殖和抵抗不良环境的重要适应方式。"},
    {"id": "tr-cl-001", "type": "translation", "categoryTitle": "腔肠动物门", "categoryId": "coelenterata-translation", "number": 1, "prompt": "请解释腔肠动物的“刺细胞”（cnidocyte/nematocyte）及其功能。", "referenceAnswer": "刺细胞是腔肠动物（刺胞动物）特有的攻击和防御细胞，主要分布于触手和体表。刺细胞内含有刺丝囊，囊内盘绕着带毒的刺丝。当受到机械和化学刺激时，刺丝囊会瞬间外翻弹出刺丝，将毒液注入敌人体内，用于捕食（麻痹猎物）和防御（驱赶天敌）。刺细胞是腔肠动物得名“刺胞动物”的原因。"},
    {"id": "tr-cl-002", "type": "translation", "categoryTitle": "腔肠动物门", "categoryId": "coelenterata-translation", "number": 2, "prompt": "请解释腔肠动物的“世代交替”（metagenesis）。", "referenceAnswer": "世代交替是指腔肠动物（如水螅纲、钵水母纲）生活史中无性生殖的水螅型（polyp）和有性生殖的水母型（medusa）有规律交替出现的现象。水螅型呈圆筒状固着生活，通过出芽进行无性生殖产生水母型；水母型呈伞状自由漂浮，产生精子和卵子进行有性生殖，受精卵发育为浮浪幼虫后再固着成为水螅型。"},
    {"id": "tr-pl-001", "type": "translation", "categoryTitle": "扁形动物门", "categoryId": "platyhelminthes-translation", "number": 1, "prompt": "请解释扁形动物的“原肾管”（protonephridium）及其功能。", "referenceAnswer": "原肾管是扁形动物（如涡虫）的排泄和渗透压调节器官，由分支的管道系统和末端的焰细胞（flame cell）组成。焰细胞是一端封闭的管细胞，细胞内有纤毛束，纤毛摆动时像火焰跳动，产生负压驱使组织中的液体（原尿）流入管道系统，经排泄孔排出体外。原肾管主要功能是排泄代谢废物和调节体内水分。"},
    {"id": "tr-pl-002", "type": "translation", "categoryTitle": "扁形动物门", "categoryId": "platyhelminthes-translation", "number": 2, "prompt": "请解释猪带绦虫的“囊尾蚴”（cysticercus）及其感染途径。", "referenceAnswer": "囊尾蚴是猪带绦虫的幼虫期，寄生于中间宿主（猪或人）的肌肉等组织中，呈囊泡状结构，内含一个翻卷的头节。人误食含有囊尾蚴的生猪肉或未煮熟猪肉后，囊尾蚴在人体小肠内翻出头节，吸附在肠壁上发育为成虫，引起猪带绦虫病。若人误食虫卵，可能在人体内发育为囊尾蚴导致囊虫病。"},
    {"id": "tr-nm-001", "type": "translation", "categoryTitle": "线虫动物门", "categoryId": "nematoda-translation", "number": 1, "prompt": "请解释线虫动物门的“假体腔”（pseudocoelom）及其特点。", "referenceAnswer": "假体腔是线虫动物等具有的一种原始体腔，由胚胎期的囊胚腔发育而来，体壁中胚层与内胚层（消化管）之间没有中胚层形成的体腔膜（腹膜）覆盖。假体腔内充满体腔液，起到支撑身体、输送营养物质和代谢废物的作用，同时作为流体静力骨骼参与运动。"},
    {"id": "tr-nm-002", "type": "translation", "categoryTitle": "线虫动物门", "categoryId": "nematoda-translation", "number": 2, "prompt": "请解释蛔虫（Ascaris）的生活史及其感染途径。", "referenceAnswer": "蛔虫（人蛔虫）是寄生于人体小肠的大型线虫。成虫在小肠内产卵，卵随粪便排出体外。受精卵在适宜外界环境中发育为含幼虫的感染期卵。人误食感染期卵后，幼虫在小肠内孵出，钻入肠壁随血液循环经肝脏、右心到达肺部，在肺内发育蜕皮后沿气管至咽部，被吞咽回小肠发育为成虫。"},
    {"id": "tr-an-001", "type": "translation", "categoryTitle": "环节动物门", "categoryId": "annelida-translation", "number": 1, "prompt": "请解释环节动物“同律分节”（homonomous metamerism）的含义。", "referenceAnswer": "同律分节是指环节动物身体由多个相似的体节（segment/metamere）沿前后轴重复排列的现象。每个体节内部具有相似的肌肉、神经节、排泄器官（肾管）、血管分支等结构，体节之间由隔膜分隔。同律分节使身体运动更加灵活高效（各体节能独立收缩），也为身体分区和功能分化奠定了基础。"},
    {"id": "tr-an-002", "type": "translation", "categoryTitle": "环节动物门", "categoryId": "annelida-translation", "number": 2, "prompt": "请解释蚯蚓的“环带”（clitellum）及其功能。", "referenceAnswer": "环带（生殖带）是蚯蚓体前部一段颜色较深、明显隆起的体节区域（约第32-37节）。环带分泌黏液形成黏液管，保护交配过程中交换的精子，并在卵产出后形成卵茧（cocoon），为受精卵的发育提供保护和营养。环带的存在是蚯蚓等寡毛纲环节动物进行生殖的关键结构。"},
    {"id": "tr-mo-001", "type": "translation", "categoryTitle": "软体动物门", "categoryId": "mollusca-translation", "number": 1, "prompt": "请解释软体动物的“外套膜”（mantle）及其功能。", "referenceAnswer": "外套膜是软体动物身体背侧的一层薄膜组织，由身体壁向腹面延伸形成，覆盖内脏团。外套膜的主要功能包括：（1）分泌贝壳——外套膜上皮细胞分泌碳酸钙和有机质形成贝壳；（2）形成呼吸腔——外套膜与内脏团之间的腔隙为外套腔，内含鳃等呼吸器官；（3）感觉功能——外套膜边缘常有触手和眼等感觉结构。"},
    {"id": "tr-mo-002", "type": "translation", "categoryTitle": "软体动物门", "categoryId": "mollusca-translation", "number": 2, "prompt": "请解释软体动物的“齿舌”（radula）及其功能。", "referenceAnswer": "齿舌是软体动物（除双壳纲外）特有的摄食器官，位于口腔底部，由多排细小的几丁质齿组成，排列成带状。齿舌通过肌肉的伸缩前后刮擦，将食物（如藻类、植物组织等）刮取并送入消化道。齿舌的形状和齿的排列方式因种类和食性不同而多样，是软体动物分类的重要依据。"},
    {"id": "ch-pz-001", "type": "choice", "categoryTitle": "原生动物门", "categoryId": "protozoa-choice", "number": 1, "prompt": "下列哪种原生动物以有性生殖（接合生殖）著称？", "options": [{"key": "A", "text": "变形虫（Amoeba）"}, {"key": "B", "text": "草履虫（Paramecium）"}, {"key": "C", "text": "眼虫（Euglena）"}, {"key": "D", "text": "疟原虫（Plasmodium）"}], "answerKey": "B", "explanation": "草履虫具有独特的接合生殖方式。变形虫主要行二分裂无性生殖；眼虫纵二分裂；疟原虫在蚊体内进行有性生殖（配子生殖）。"},
    {"id": "ch-pz-002", "type": "choice", "categoryTitle": "原生动物门", "categoryId": "protozoa-choice", "number": 2, "prompt": "疟原虫（Plasmodium）的中间宿主和终末宿主分别是？", "options": [{"key": "A", "text": "人为终末宿主，蚊为中间宿主"}, {"key": "B", "text": "蚊为终末宿主，人为中间宿主"}, {"key": "C", "text": "蚊和人均为终末宿主"}, {"key": "D", "text": "蚊和人均为中间宿主"}], "answerKey": "B", "explanation": "疟原虫的生活史中，人在其体内进行无性生殖（裂体生殖）和配子体的形成，因此人是中间宿主；而在蚊体内进行有性生殖（配子生殖）和孢子生殖，因此蚊是终末宿主。"},
    {"id": "ch-sp-001", "type": "choice", "categoryTitle": "海绵动物门", "categoryId": "porifera-choice", "number": 1, "prompt": "海绵动物胚胎发育中的“翻转现象”（inversion）发生在哪个阶段？", "options": [{"key": "A", "text": "囊胚期（blastula）"}, {"key": "B", "text": "原肠胚期（gastrula）"}, {"key": "C", "text": "两囊幼虫期（amphiblastula）"}, {"key": "D", "text": "浮浪幼虫期（planula）"}], "answerKey": "C", "explanation": "海绵动物的两囊幼虫在水中自由游泳一段时间后，后端具鞭毛的细胞向内翻入，前端无鞭毛的细胞翻到外面，称为翻转现象。"},
    {"id": "ch-sp-002", "type": "choice", "categoryTitle": "海绵动物门", "categoryId": "porifera-choice", "number": 2, "prompt": "构成海绵动物骨骼的主要成分不包括以下哪项？", "options": [{"key": "A", "text": "钙质骨针"}, {"key": "B", "text": "硅质骨针"}, {"key": "C", "text": "角质骨针"}, {"key": "D", "text": "海绵丝"}], "answerKey": "C", "explanation": "海绵动物的骨骼由骨针和海绵丝构成。骨针分为钙质骨针（碳酸钙）和硅质骨针（二氧化硅）。不存在“角质骨针”这一分类。"},
    {"id": "ch-cl-001", "type": "choice", "categoryTitle": "腔肠动物门", "categoryId": "coelenterata-choice", "number": 1, "prompt": "腔肠动物的神经系统属于哪种类型？", "options": [{"key": "A", "text": "梯状神经系统"}, {"key": "B", "text": "链状神经系统"}, {"key": "C", "text": "网状神经系统"}, {"key": "D", "text": "管状神经系统"}], "answerKey": "C", "explanation": "腔肠动物具有弥散性的网状神经系统，神经细胞和神经纤维交织成网，无神经中枢。梯状神经系统见于扁形动物，链状神经系统见于环节动物和节肢动物。"},
    {"id": "ch-cl-002", "type": "choice", "categoryTitle": "腔肠动物门", "categoryId": "coelenterata-choice", "number": 2, "prompt": "水母的感觉器官是？", "options": [{"key": "A", "text": "触手囊"}, {"key": "B", "text": "眼点"}, {"key": "C", "text": "平衡囊（statocyst）"}, {"key": "D", "text": "侧线"}], "answerKey": "C", "explanation": "水母的伞缘具有平衡囊（statocyst），内含平衡石（statolith），主要功能是维持身体平衡和感知身体在空间中的方位。"},
    {"id": "ch-pl-001", "type": "choice", "categoryTitle": "扁形动物门", "categoryId": "platyhelminthes-choice", "number": 1, "prompt": "下列哪项不是扁形动物的主要特征？", "options": [{"key": "A", "text": "身体扁平，两侧对称"}, {"key": "B", "text": "具有真正的体腔"}, {"key": "C", "text": "三胚层发育"}, {"key": "D", "text": "无肛门"}], "answerKey": "B", "explanation": "扁形动物是两侧对称、三胚层、无体腔的动物。它们没有真正的体腔（体壁和消化管之间由实质组织填充）。具有真正体腔的动物从环节动物开始出现。"},
    {"id": "ch-pl-002", "type": "choice", "categoryTitle": "扁形动物门", "categoryId": "platyhelminthes-choice", "number": 2, "prompt": "肝片吸虫（Fasciola hepatica）的第一中间宿主是？", "options": [{"key": "A", "text": "钉螺"}, {"key": "B", "text": "椎实螺（Lymnaea）"}, {"key": "C", "text": "扁卷螺"}, {"key": "D", "text": "川蜷螺"}], "answerKey": "B", "explanation": "肝片吸虫的第一中间宿主是椎实螺（Lymnaea）。毛蚴侵入椎实螺体内发育为尾蚴，尾蚴在水生植物上形成囊蚴。终末宿主吞食囊蚴后感染。"},
    {"id": "ch-nm-001", "type": "choice", "categoryTitle": "线虫动物门", "categoryId": "nematoda-choice", "number": 1, "prompt": "线虫动物与扁形动物相比最重要的进步特征是？", "options": [{"key": "A", "text": "出现了假体腔"}, {"key": "B", "text": "具有真正的体节"}, {"key": "C", "text": "具有闭管式循环系统"}, {"key": "D", "text": "具有后肾管"}], "answerKey": "A", "explanation": "线虫动物首次出现了假体腔（伪体腔），这是从扁形动物无体腔到具有体腔的重要进化。体节从环节动物开始出现；闭管式循环和后肾管也从环节动物开始。"},
    {"id": "ch-nm-002", "type": "choice", "categoryTitle": "线虫动物门", "categoryId": "nematoda-choice", "number": 2, "prompt": "丝虫（Wuchereria bancrofti）的传播媒介是？", "options": [{"key": "A", "text": "按蚊"}, {"key": "B", "text": "库蚊（Culex）"}, {"key": "C", "text": "白蛉"}, {"key": "D", "text": "蚋"}], "answerKey": "B", "explanation": "班氏丝虫由库蚊（Culex）传播。按蚊传播疟原虫，白蛉传播利什曼原虫，蚋传播盘尾丝虫。"},
    {"id": "ch-an-001", "type": "choice", "categoryTitle": "环节动物门", "categoryId": "annelida-choice", "number": 1, "prompt": "蚯蚓的排泄器官是？", "options": [{"key": "A", "text": "原肾管"}, {"key": "B", "text": "后肾管（metanephridium）"}, {"key": "C", "text": "马氏管"}, {"key": "D", "text": "触角腺"}], "answerKey": "B", "explanation": "蚯蚓（环节动物）具有后肾管，每个体节有一对。原肾管见于扁形动物；马氏管是昆虫的排泄器官；触角腺是甲壳动物的排泄器官。"},
    {"id": "ch-an-002", "type": "choice", "categoryTitle": "环节动物门", "categoryId": "annelida-choice", "number": 2, "prompt": "下列哪种动物不属于环节动物门？", "options": [{"key": "A", "text": "沙蚕"}, {"key": "B", "text": "蚂蟥"}, {"key": "C", "text": "蚯蚓"}, {"key": "D", "text": "钩虫"}], "answerKey": "D", "explanation": "钩虫属于线虫动物门（Nematoda），是寄生性线虫。沙蚕属于多毛纲，蚂蟥属于蛭纲，蚯蚓属于寡毛纲。"},
    {"id": "ch-mo-001", "type": "choice", "categoryTitle": "软体动物门", "categoryId": "mollusca-choice", "number": 1, "prompt": "软体动物中具有闭管式循环系统的是哪一纲？", "options": [{"key": "A", "text": "腹足纲"}, {"key": "B", "text": "双壳纲"}, {"key": "C", "text": "头足纲（Cephalopoda）"}, {"key": "D", "text": "多板纲"}], "answerKey": "C", "explanation": "头足纲（如乌贼、章鱼）具有闭管式循环系统。其他软体动物（腹足纲、双壳纲等）均为开管式循环系统。"},
    {"id": "ch-mo-002", "type": "choice", "categoryTitle": "软体动物门", "categoryId": "mollusca-choice", "number": 2, "prompt": "河蚌驱动水流的器官是？", "options": [{"key": "A", "text": "外套膜上的纤毛"}, {"key": "B", "text": "鳃上的纤毛"}, {"key": "C", "text": "斧足的收缩"}, {"key": "D", "text": "入水管和出水管"}], "answerKey": "B", "explanation": "河蚌等双壳纲动物依靠鳃上皮细胞上密集的纤毛摆动产生定向水流，完成呼吸和滤食。"},
    {"id": "tf-pz-001", "type": "true-false", "categoryTitle": "原生动物门", "categoryId": "protozoa-true-false", "number": 1, "prompt": "所有原生动物都是单细胞动物，但一个细胞便能完成一切生理功能。", "answerIsTrue": True, "explanation": "原生动物是单细胞动物，其细胞质已分化为各种细胞器（类器官）来执行运动、摄食、排泄、生殖等多种生理功能。"},
    {"id": "tf-pz-002", "type": "true-false", "categoryTitle": "原生动物门", "categoryId": "protozoa-true-false", "number": 2, "prompt": "疟原虫的生活史中只需要一个宿主即可完成全部发育过程。", "answerIsTrue": False, "explanation": "疟原虫需要两个宿主交替完成生活史：在人体内进行无性生殖，在蚊体内进行有性生殖和孢子生殖。"},
    {"id": "tf-sp-001", "type": "true-false", "categoryTitle": "海绵动物门", "categoryId": "porifera-true-false", "number": 1, "prompt": "海绵动物虽然有多种细胞，但尚未形成真正的组织。", "answerIsTrue": True, "explanation": "海绵动物的细胞虽然有分化，但细胞之间连接松散，尚未形成真正的组织（没有细胞层之间的基底膜）。"},
    {"id": "tf-sp-002", "type": "true-false", "categoryTitle": "海绵动物门", "categoryId": "porifera-true-false", "number": 2, "prompt": "海绵动物全部生活在海洋环境中。", "answerIsTrue": False, "explanation": "虽然大多数海绵生活在海洋中，但少数种类（如淡水海绵科）生活在淡水中。"},
    {"id": "tf-cl-001", "type": "true-false", "categoryTitle": "腔肠动物门", "categoryId": "coelenterata-true-false", "number": 1, "prompt": "水螅型和水母型均为腔肠动物生活史中可能出现的形式。", "answerIsTrue": True, "explanation": "许多腔肠动物（刺胞动物）的生活史中存在水螅型和水母型两种体型的交替现象，称为世代交替。"},
    {"id": "tf-cl-002", "type": "true-false", "categoryTitle": "腔肠动物门", "categoryId": "coelenterata-true-false", "number": 2, "prompt": "珊瑚虫属于水螅纲（Hydrozoa）。", "answerIsTrue": False, "explanation": "珊瑚虫属于珊瑚纲（Anthozoa），不是水螅纲。珊瑚纲只有水螅型无水母型。"},
    {"id": "tf-pl-001", "type": "true-false", "categoryTitle": "扁形动物门", "categoryId": "platyhelminthes-true-false", "number": 1, "prompt": "扁形动物是有口无肛门的动物。", "answerIsTrue": True, "explanation": "扁形动物的消化管有口无肛门，称为不完全消化管。从线形动物开始出现了有口有肛门的完全消化管。"},
    {"id": "tf-pl-002", "type": "true-false", "categoryTitle": "扁形动物门", "categoryId": "platyhelminthes-true-false", "number": 2, "prompt": "猪带绦虫的成体寄生于猪的肌肉组织中。", "answerIsTrue": False, "explanation": "猪带绦虫的成虫寄生于人体小肠，人是其终末宿主。猪是其中间宿主，其幼虫期（囊尾蚴）寄生于猪的肌肉等组织中。"},
    {"id": "tf-nm-001", "type": "true-false", "categoryTitle": "线虫动物门", "categoryId": "nematoda-true-false", "number": 1, "prompt": "线虫动物具有假体腔和完全的消化管（有口有肛门）。", "answerIsTrue": True, "explanation": "线虫动物首次进化出假体腔，同时具有完全的消化管——食物从口进入，经消化管后从肛门排出。"},
    {"id": "tf-nm-002", "type": "true-false", "categoryTitle": "线虫动物门", "categoryId": "nematoda-true-false", "number": 2, "prompt": "蛔虫的体壁肌肉为平滑肌。", "answerIsTrue": False, "explanation": "蛔虫的体壁肌肉是斜纹肌（obliquely striated muscle），介于平滑肌和横纹肌之间。"},
    {"id": "tf-an-001", "type": "true-false", "categoryTitle": "环节动物门", "categoryId": "annelida-true-false", "number": 1, "prompt": "蚯蚓的血液循环为闭管式循环。", "answerIsTrue": True, "explanation": "蚯蚓具有闭管式循环系统，血液始终在血管内流动，由心脏（环形血管）驱动。"},
    {"id": "tf-an-002", "type": "true-false", "categoryTitle": "环节动物门", "categoryId": "annelida-true-false", "number": 2, "prompt": "所有环节动物都有刚毛。", "answerIsTrue": False, "explanation": "并非所有环节动物都有刚毛。多毛纲有发达的刚毛；寡毛纲有少量刚毛；蛭纲（如蚂蟥）则无刚毛。"},
    {"id": "tf-mo-001", "type": "true-false", "categoryTitle": "软体动物门", "categoryId": "mollusca-true-false", "number": 1, "prompt": "软体动物大多具有贝壳，贝壳由外套膜分泌形成。", "answerIsTrue": True, "explanation": "软体动物大多具有贝壳，贝壳由外套膜上皮细胞分泌的碳酸钙和有机质（贝壳素）形成。"},
    {"id": "tf-mo-002", "type": "true-false", "categoryTitle": "软体动物门", "categoryId": "mollusca-true-false", "number": 2, "prompt": "所有软体动物都是雌雄异体。", "answerIsTrue": False, "explanation": "并非所有软体动物都是雌雄异体。腹足纲的许多种类（如蜗牛）是雌雄同体。"},
    {"id": "es-pz-001", "type": "essay", "categoryTitle": "原生动物门", "categoryId": "protozoa-essay", "number": 1, "prompt": "试述原生动物的主要特征及其在动物进化中的地位。", "referenceAnswer": "## 原生动物的主要特征\n\n1. **单细胞性**：身体由单个细胞构成，但细胞内分化出各种细胞器执行不同生理功能。\n2. **形体微小**：一般在微米级别。\n3. **生活多样**：自由生活或寄生生活。\n4. **运动方式多样**：伪足、鞭毛、纤毛等。\n5. **生殖方式丰富**：无性生殖和有性生殖。\n6. **具有包囊能力**。\n\n## 进化地位\n\n原生动物是动物界中最原始、最低等的动物，是单细胞动物的代表。一般认为由类似鞭毛虫的祖先通过群体方式演化出多细胞动物。"},
    {"id": "es-pz-002", "type": "essay", "categoryTitle": "原生动物门", "categoryId": "protozoa-essay", "number": 2, "prompt": "比较草履虫和变形虫在运动和摄食方式上的主要区别。", "referenceAnswer": "## 运动方式\n\n**草履虫**：依靠纤毛规律性摆动旋转前进。\n**变形虫**：依靠伪足进行变形运动。\n\n## 摄食方式\n\n**草履虫**：通过口沟纤毛摆动形成水流将食物送入胞口，形成食物泡进行胞吞。\n**变形虫**：伸出伪足包围食物颗粒形成食物泡。\n\n## 共同点\n\n两者均为细胞内消化。"},
    {"id": "es-sp-001", "type": "essay", "categoryTitle": "海绵动物门", "categoryId": "porifera-essay", "number": 1, "prompt": "试述为什么海绵动物被称为“侧生动物”（Parazoa）？", "referenceAnswer": "海绵动物被称为侧生动物，是因为它们在多细胞动物进化中处于一个侧枝地位，未形成真正的组织器官。原始性体现在：细胞水平（未形成真正的组织和器官）、无消化腔、无神经系统、胚胎发育特殊（翻转现象）、再生能力强、通过水沟系进行滤食。"},
    {"id": "es-sp-002", "type": "essay", "categoryTitle": "海绵动物门", "categoryId": "porifera-essay", "number": 2, "prompt": "描述海绵动物的水沟系类型及其进化趋势。", "referenceAnswer": "## 水沟系的三种基本类型\n\n**1. 单沟型**：最简单，领细胞排列在中央腔壁上。\n**2. 双沟型**：体壁增厚形成辐射排列的鞭毛室。\n**3. 复沟型**：最复杂，鞭毛室小而多，滤食效率最高。\n\n## 进化趋势\n\n单沟型→双沟型→复沟型：体壁越来越厚、鞭毛室数量增多、领细胞总面积增大、滤食效率不断提高。"},
    {"id": "es-cl-001", "type": "essay", "categoryTitle": "腔肠动物门", "categoryId": "coelenterata-essay", "number": 1, "prompt": "试述腔肠动物的体制特征及其在动物进化中的意义。", "referenceAnswer": "## 体制特征\n\n1. **辐射对称**\n2. **两胚层**：外胚层和内胚层，中胶层\n3. **消化循环腔**：有口无肛门\n4. **网状神经系统**\n5. **刺细胞**\n\n## 进化意义\n\n腔肠动物是真正的后生动物的开始：真正的多细胞组织、消化腔的出现、细胞外消化的开始、神经系统的起源。"},
    {"id": "es-cl-002", "type": "essay", "categoryTitle": "腔肠动物门", "categoryId": "coelenterata-essay", "number": 2, "prompt": "比较水螅纲、钵水母纲和珊瑚纲的主要区别。", "referenceAnswer": "## 水螅纲\n- 多有世代交替，水母型有缘膜\n- 消化循环腔无隔膜\n- 生殖细胞来源于外胚层\n\n## 钵水母纲\n- 以水母型为主，无缘膜\n- 消化循环腔有隔膜\n- 生殖细胞来源于内胚层\n\n## 珊瑚纲\n- 只有水螅型\n- 隔膜发达\n- 多有钙质外骨骼"},
    {"id": "es-pl-001", "type": "essay", "categoryTitle": "扁形动物门", "categoryId": "platyhelminthes-essay", "number": 1, "prompt": "试述扁形动物门的主要特征及其在动物进化中的地位。", "referenceAnswer": "## 主要特征\n\n1. **两侧对称**\n2. **三胚层**\n3. **无体腔**\n4. **皮肤肌肉囊**\n5. **不完全消化管**（有口无肛门）\n6. **梯状神经系统**\n7. **原肾管排泄系统**\n8. **大多雌雄同体**\n\n## 进化地位\n\n两侧对称和三胚层的出现是动物进化史上的重大事件。扁形动物是两侧对称三胚层无体腔动物的代表。"},
    {"id": "es-pl-002", "type": "essay", "categoryTitle": "扁形动物门", "categoryId": "platyhelminthes-essay", "number": 2, "prompt": "比较吸虫纲和绦虫纲在形态结构上的适应性变化。", "referenceAnswer": "## 吸虫纲\n- 叶状体形，有口吸盘和腹吸盘\n- 有不完全消化管\n- 合胞体性质皮层层\n\n## 绦虫纲\n- 带状，由头节、颈部和节片组成\n- 无消化管（通过体壁吸收营养）\n- 每个成熟节片均有完整生殖器官\n\n两者均具有发达的生殖系统和复杂的幼虫期。"},
    {"id": "es-nm-001", "type": "essay", "categoryTitle": "线虫动物门", "categoryId": "nematoda-essay", "number": 1, "prompt": "试述假体腔的出现有何进化意义？以线虫为例说明。", "referenceAnswer": "## 假体腔的进化意义\n\n1. **流体静力骨骼**：支撑身体\n2. **物质运输**：体腔液循环运输\n3. **器官发展空间**\n\n## 线虫特点\n\n1. 细长线形，角质层\n2. 仅纵肌（斜纹肌），无环肌\n3. 做弯曲摆动\n4. 完全消化管（有口有肛门）\n5. 大多雌雄异体"},
    {"id": "es-nm-002", "type": "essay", "categoryTitle": "线虫动物门", "categoryId": "nematoda-essay", "number": 2, "prompt": "比较线虫动物与环节动物在体壁结构和运动方式上的主要差异。", "referenceAnswer": "## 体壁结构\n\n**线虫**：厚角质层 + 合胞体表皮 + 仅纵肌\n**环节动物**：薄角质层 + 单层柱状上皮 + 环肌和纵肌\n\n## 运动方式\n\n**线虫**：仅弯曲摆动\n**环节动物**：蠕动运动（环肌和纵肌交替收缩）\n\n## 进化意义\n\n环节动物代表了更高级的进化阶段。\n"},
    {"id": "es-an-001", "type": "essay", "categoryTitle": "环节动物门", "categoryId": "annelida-essay", "number": 1, "prompt": "试述环节动物分节现象和真体腔的出现有何进化意义？", "referenceAnswer": "## 分节现象的进化意义\n\n1. **运动效率提高**：各体节独立收缩\n2. **身体灵活性增强**\n3. **功能分化基础**\n4. **损伤保护**\n\n## 真体腔的进化意义\n\n1. **高效流体静力骨骼**\n2. **消化管独立运动**\n3. **循环系统的空间**\n4. **器官系统发育空间**\n\n两者结合使环节动物成功适应多种生境。"},
    {"id": "es-an-002", "type": "essay", "categoryTitle": "环节动物门", "categoryId": "annelida-essay", "number": 2, "prompt": "比较多毛纲、寡毛纲和蛭纲的主要区别。", "referenceAnswer": "## 多毛纲\n- 海洋生活，头部发达\n- 有疣足和发达刚毛\n- 雌雄异体，有担轮幼虫\n\n## 寡毛纲\n- 陆生或淡水，头部不发达\n- 无疣足，刚毛较少\n- 雌雄同体，有环带\n\n## 蛭纲\n- 淡水或潮湿陆地，半寄生\n- 无刚毛，有吸盘\n- 雌雄同体，有环带"},
    {"id": "es-mo-001", "type": "essay", "categoryTitle": "软体动物门", "categoryId": "mollusca-essay", "number": 1, "prompt": "试述软体动物门的主要特征和分类概况。", "referenceAnswer": "## 主要特征\n\n1. **身体分区**：头、足、内脏团、外套膜\n2. **贝壳**：由外套膜分泌\n3. **齿舌**（除双壳纲）\n4. **开管式循环**（除头足纲）\n\n## 主要各纲\n\n**腹足纲**：身体扭转，螺旋形贝壳\n**双壳纲**：两片贝壳，滤食\n**头足纲**：闭管式循环，发达神经系统\n**多板纲**：八块覆瓦状贝壳"},
    {"id": "es-mo-002", "type": "essay", "categoryTitle": "软体动物门", "categoryId": "mollusca-essay", "number": 2, "prompt": "试述软体动物与人类的关系（经济意义和医学意义）。", "referenceAnswer": "## 有益方面\n\n**食用**：鲍鱼、牡蛎、扇贝、乌贼等\n**工业**：珍珠（饰品）、贝壳（工艺品）\n**科研**：乌贼巨大神经轴突\n\n## 有害方面\n\n**农业**：蜗牛、蛞蝓取食作物\n**医学**：钉螺传播血吸虫\n**工程**：船蛆破坏木船，藤壶附着船底"}
]

data["questions"] = questions
data["totalQuestions"] = len(questions)

with open("E:/Zoology/ZJU_Zoology_Tests/public/question-bank.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Created question-bank.json with {len(questions)} questions across {len(data['categories'])} categories")
