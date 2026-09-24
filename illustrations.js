/* Ilustraciones vectoriales originales de CASA ACTIVA. Dos posiciones por ejercicio. */
function schematicScene(id,phase=0,label=true){
 const C={skin:'#D39C7B',skin2:'#B78061',shirt:'#2C6B59',light:'#4C8B73',pants:'#284148',far:'#405C62',shoe:'#F6F3E9',ink:'#183C34',metal:'#718785',soft:'#CFDCD4'};
 const p=(x,y)=>[x,y], mid=(a,b,t=.5)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
 const line=(a,b,w,c)=>`<path d="M${a} L${b}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
 const dot=(a,r,c)=>`<circle cx="${a[0]}" cy="${a[1]}" r="${r}" fill="${c}"/>`;
 const rect=(x,y,w,h,r,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c}"/>`;
 const arrow=(x,y,rot=0)=>`<g transform="translate(${x} ${y}) rotate(${rot})" stroke="#B47343" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M0 22 V0 m-6 6 6-6 6 6"/></g>`;
 const db=(a,rot=0)=>`<g transform="translate(${a[0]} ${a[1]}) rotate(${rot})">${rect(-18,-3,36,6,2,'#A5B8B3')}${rect(-20,-11,10,22,3,C.ink)}${rect(10,-11,10,22,3,C.ink)}${rect(-17,-8,3,16,1,'#4C776A')}${rect(13,-8,3,16,1,'#4C776A')}</g>`;
 function limb(chain,leg=false,far=false){let out='';for(let i=0;i<chain.length-1;i++)out+=line(chain[i],chain[i+1],leg?(i===0?20:15):13,leg?(far?C.far:C.pants):(far?C.skin2:C.skin));
 if(!leg)out+=line(chain[0],mid(chain[0],chain[1],.36),18,far?C.shirt:C.light)+dot(chain.at(-1),7,far?C.skin2:C.skin);
 else{let a=chain.at(-1),raised=id==='calf'&&phase,toe=[a[0]+12,a[1]+(raised?14:1)];out+=line([a[0]-3,a[1]],toe,10,C.shoe)+line([a[0]-6,a[1]+6],[toe[0]+3,toe[1]+5],3,C.ink);}
 return out;}
 function body(d){let {s,h,head,arms,legs,front=false,face=1,curve=0}=d;let v=[h[0]-s[0],h[1]-s[1]],len=Math.hypot(...v)||1,n=[v[1]/len,-v[0]/len],sw=front?22:16,hw=front?18:14;
 const q=(a,k)=>[a[0]+n[0]*k,a[1]+n[1]*k];let a=q(s,sw),b=q(h,hw),c=q(h,-hw),dd=q(s,-sw);
 let out=limb(legs[0],true,true)+limb(arms[0],false,true);
 out+=line(s,head,13,C.skin)+`<path d="M${a} Q${mid(a,b)[0]+curve} ${mid(a,b)[1]} ${b} L${c} Q${mid(c,dd)[0]+curve} ${mid(c,dd)[1]} ${dd} Q${s[0]} ${s[1]-9} ${a}Z" fill="${C.shirt}"/>`;
 out+=line(mid(s,h,.16),mid(s,h,.7),3,C.light)+limb(legs[1],true,false)+limb(arms[1],false,false);
 out+=`<g transform="translate(${head[0]} ${head[1]})"><ellipse rx="15" ry="18" fill="${C.skin}"/><path d="M-14-3 C-19-26 18-24 15-1 L8-9 -9-11Z" fill="${C.ink}"/><circle cx="${face*7}" cy="-1" r="1.5" fill="${C.ink}"/><path d="M${face*9} 3 l${face*6} 1 -${face*5} 3" fill="${C.skin}"/><path d="M${face*6} 9 h4" stroke="${C.skin2}" stroke-width="1.3"/></g>`;
 return out;}
 let art='',w='',caption='',d;
 const stand=(arms,legs=null)=>({s:p(170,101),h:p(170,173),head:p(170,73),front:true,arms,legs:legs||[[p(158,172),p(153,211),p(146,248)],[p(182,172),p(188,211),p(194,248)]]});
 switch(id){
 case 'curl':case 'hammer':{
 let la=phase?[p(147,104),p(139,146),p(146,106)]:[p(147,104),p(139,147),p(133,189)],ra=phase?[p(191,104),p(200,146),p(195,106)]:[p(191,104),p(200,147),p(206,189)];
 if(id==='hammer'&&phase)la=[p(147,104),p(139,147),p(133,189)];
 art=body(stand([la,ra]));
 if(id==='curl'){let yy=phase?109:190;art+=`<path d="M115 ${yy} h19 l10-5 10 5 h32 l10-5 10 5 h19" fill="none" stroke="#879B95" stroke-width="6" stroke-linejoin="round"/>`+rect(111,yy-14,10,28,3,C.ink)+rect(218,yy-14,10,28,3,C.ink);}else art+=db(la.at(-1),90)+db(ra.at(-1),90);
 art+=arrow(238,phase?115:157,phase?180:0);caption=phase?'Sube sin balancear el tronco':'Codos cerca del cuerpo';break;}
 case 'press':{
 let la=phase?[p(148,104),p(138,69),p(143,31)]:[p(148,104),p(122,121),p(118,78)],ra=phase?[p(192,104),p(201,69),p(196,31)]:[p(192,104),p(218,121),p(222,78)];
 art=body(stand([la,ra]))+db(la.at(-1))+db(ra.at(-1))+arrow(254,60,phase?180:0);caption=phase?'Sube sin arquear la espalda':'Abdomen firme; carga cómoda';break;}
 case 'squat':{
 d=phase?{s:p(186,133),h:p(140,181),head:p(207,113),arms:[[p(181,137),p(216,147),p(243,132)],[p(187,134),p(223,141),p(248,125)]],legs:[[p(139,179),p(200,198),p(207,248)],[p(147,186),p(209,205),p(216,248)]]}:{s:p(172,101),h:p(169,174),head:p(173,71),arms:[[p(166,109),p(199,121),p(231,119)],[p(179,109),p(205,115),p(238,112)]],legs:[[p(159,176),p(159,214),p(156,248)],[p(176,176),p(185,213),p(192,248)]]};
 art=body(d)+arrow(104,159,phase?180:0);caption=phase?'Baja solo hasta donde controles':'Pies apoyados y postura estable';break;}
 case 'dbrow':{
 const s=p(203,125),h=p(142,175);let far=phase?[p(192,128),p(153,132),p(174,165)]:[p(192,128),p(186,171),p(185,209)],near=phase?[p(204,130),p(169,140),p(185,173)]:[p(204,130),p(201,179),p(202,219)];
 art=body({s,h,head:p(226,102),arms:[far,near],legs:[[p(138,171),p(151,210),p(124,248)],[p(150,178),p(170,213),p(150,248)]]})+db(far.at(-1))+db(near.at(-1))+arrow(249,167,phase?180:0);caption=phase?'Lleva los codos hacia atrás':'Inclina desde la cadera';break;}
 case 'hinge':{
 d=phase?{s:p(205,130),h:p(139,158),head:p(231,117),arms:[[p(202,137),p(190,177),p(187,211)],[p(213,144),p(205,183),p(201,218)]],legs:[[p(134,160),p(147,203),p(140,248)],[p(147,163),p(169,206),p(166,248)]]}:{s:p(170,100),h:p(169,174),head:p(172,71),arms:[[p(159,106),p(151,147),p(149,184)],[p(183,107),p(190,146),p(193,184)]],legs:[[p(158,175),p(155,212),p(152,248)],[p(178,176),p(184,213),p(187,248)]]};art=body(d)+arrow(113,166,270);caption=phase?'Cadera atrás; espalda larga':'Ensaya primero sin peso';break;}
 case 'floorpress':{
 let far=phase?[p(103,221),p(105,177),p(108,134)]:[p(103,221),p(141,226),p(142,181)],near=phase?[p(94,223),p(93,182),p(91,141)]:[p(94,223),p(120,231),p(120,189)];
 art=body({s:p(95,224),h:p(173,227),head:p(65,221),face:-1,arms:[far,near],legs:[[p(169,225),p(214,184),p(256,245)],[p(179,229),p(228,190),p(274,245)]]})+db(far.at(-1))+db(near.at(-1))+arrow(49,159,phase?180:0);caption=phase?'Empuja sobre el pecho':'Brazos apoyados suavemente';break;}
 case 'bridge':{
 d={s:p(91,230),h:p(165,phase?180:228),head:p(60,229),face:-1,arms:[[p(100,234),p(140,242),p(167,245)],[p(92,238),p(131,248),p(173,248)]],legs:[[p(162,phase?179:222),p(220,178),p(257,244)],[p(173,phase?183:229),p(233,185),p(273,244)]]};art=body(d)+arrow(167,135,phase?180:0);caption=phase?'Eleva la cadera sin arquear':'Talones apoyados en el suelo';break;}
 case 'deadbug':{
 let farA=phase?[p(98,215),p(65,186),p(26,173)]:[p(98,215),p(104,175),p(109,139)],nearA=[p(97,224),p(92,179),p(92,142)],farL=[p(174,217),p(198,158),p(248,158)],nearL=phase?[p(181,227),p(230,216),p(285,224)]:[p(181,227),p(217,167),p(269,167)];
 art=body({s:p(96,224),h:p(173,225),head:p(65,224),face:-1,arms:[farA,nearA],legs:[farL,nearL]});caption=phase?'Extiende brazo y pierna opuestos':'Espalda cómoda; respira';break;}
 case 'birddog':{
 let farA=phase?[p(118,145),p(77,146),p(32,146)]:[p(119,146),p(119,188),p(119,233)],nearA=[p(129,146),p(129,192),p(129,237)],farL=[p(221,151),p(220,220),p(271,239)],nearL=phase?[p(212,145),p(257,145),p(308,145)]:[p(212,151),p(208,220),p(260,239)];
 art=body({s:p(121,145),h:p(213,146),head:p(98,130),face:-1,arms:[farA,nearA],legs:[farL,nearL]});caption=phase?'Alarga sin girar la pelvis':'Manos bajo hombros';break;}
 case 'catcow':{
 art=body({s:p(121,phase?154:142),h:p(213,154),head:p(92,phase?130:161),face:-1,curve:phase?-12:12,arms:[[p(121,150),p(117,192),p(114,235)],[p(129,150),p(130,190),p(131,239)]],legs:[[p(215,151),p(214,223),p(264,239)],[p(207,153),p(203,221),p(250,239)]]});
 art+=`<path d="M127 ${phase?142:131} Q167 ${phase?170:95} 205 143" fill="none" stroke="${C.shirt}" stroke-width="25" stroke-linecap="round"/>`;caption=phase?'Abre el pecho sin forzar':'Redondea con suavidad';break;}
 case 'wallpush':{
 art+=rect(277,40,8,216,4,C.soft)+line(p(279,70),p(293,55),2,'#AEBCB3')+line(p(279,110),p(293,95),2,'#AEBCB3')+line(p(279,150),p(293,135),2,'#AEBCB3');
 let s=phase?p(214,103):p(177,101),h=phase?p(191,168):p(160,169);art+=body({s,h,head:phase?p(224,74):p(184,72),arms:phase?[[p(214,103),p(242,145),p(275,104)],[p(215,111),p(246,152),p(275,113)]]:[[p(177,101),p(224,103),p(275,104)],[p(178,110),p(226,112),p(275,113)]],legs:[[p(h[0]-5,h[1]),p(phase?167:151,209),p(148,248)],[h,p(phase?176:159,208),p(158,248)]]});caption=phase?'Acerca el pecho a la pared':'Cuerpo alineado; manos firmes';break;}
 case 'plank':{
 d=phase?{s:p(104,160),h:p(180,186),head:p(78,146),face:-1,arms:[[p(109,161),p(105,228),p(67,239)],[p(100,166),p(91,232),p(45,240)]],legs:[[p(183,188),p(243,234),p(286,226)],[p(177,194),p(236,239),p(287,235)]]}:{s:p(109,140),h:p(208,137),head:p(79,132),face:-1,arms:[[p(109,141),p(111,187),p(114,238)],[p(119,144),p(124,190),p(127,241)]],legs:[[p(211,139),p(211,227),p(264,238)],[p(203,145),p(201,230),p(251,243)]]};art=body(d);caption=phase?'Mantén y respira con normalidad':'Prepara el apoyo sobre rodillas';break;}
 case 'calf':{
 let yy=phase?-14:0;art=`<g transform="translate(0 ${yy})">`+body(stand([[p(147,105),p(139,147),p(133,189)],[p(191,106),p(200,145),p(206,184)]]))+`</g>`;art+=arrow(239,205,phase?180:0);caption=phase?'Sube los talones con control':'Apóyate en una pared si hace falta';break;}
 case 'circles':{
 let aa=phase?[[p(147,103),p(113,92),p(81,89)],[p(192,103),p(225,92),p(256,89)]]:[[p(147,103),p(113,115),p(81,119)],[p(192,103),p(224,115),p(258,119)]];art=body(stand(aa))+`<path d="M66 101 a16 17 0 1 1 8 26 M274 101 a16 17 0 1 0-8 26" stroke="#B47343" stroke-width="2.5" fill="none" stroke-dasharray="4 4"/>`;caption='Círculos pequeños; hombros relajados';break;}
 case 'rower':{
 art+=line(p(54,232),p(301,232),8,C.metal)+line(p(61,232),p(48,249),7,C.metal)+line(p(291,232),p(303,249),7,C.metal)+dot(p(72,203),30,'#445D59')+dot(p(72,203),19,'#8B9D91')+dot(p(72,203),5,C.ink)+line(p(76,176),p(80,141),5,C.metal)+rect(67,126,29,19,4,C.ink)+line(p(118,211),p(133,189),8,C.ink);
 d=phase?{s:p(267,124),h:p(234,206),head:p(278,98),face:-1,arms:[[p(266,132),p(287,159),p(237,157)],[p(262,136),p(277,171),p(232,166)]],legs:[[p(230,203),p(178,200),p(128,204)],[p(238,212),p(186,212),p(129,212)]]}:{s:p(166,127),h:p(190,205),head:p(160,99),face:-1,arms:[[p(162,132),p(130,147),p(96,158)],[p(171,138),p(132,158),p(100,168)]],legs:[[p(187,201),p(145,164),p(128,202)],[p(196,207),p(156,175),p(132,212)]]};art+=rect(d.h[0]-18,216,40,9,4,C.ink)+line(p(80,181),d.arms[1].at(-1),2,C.ink)+body(d)+line([d.arms[1].at(-1)[0]-7,d.arms[1].at(-1)[1]],[d.arms[1].at(-1)[0]+9,d.arms[1].at(-1)[1]-5],6,C.ink);caption=phase?'Final: piernas · tronco · brazos':'Inicio: brazos largos, espalda neutra';break;}
 case 'bike':{
 art+=line(p(103,246),p(262,246),8,C.metal)+line(p(159,222),p(125,151),8,C.metal)+rect(108,141,38,10,5,C.ink)+dot(p(202,213),32,'#516D62')+dot(p(202,213),21,'#9CB5A4')+line(p(203,213),p(234,123),7,C.metal)+line(p(234,123),p(255,115),9,C.ink)+rect(239,94,24,15,4,C.ink);
 d={s:p(174,94),h:p(127,145),head:p(194,73),arms:[[p(176,100),p(198,127),p(235,116)],[p(181,102),p(205,137),p(246,120)]],legs:phase?[[p(130,147),p(178,165),p(168,210)],[p(139,150),p(200,188),p(218,229)]]:[[p(131,146),p(179,185),p(165,230)],[p(140,150),p(195,152),p(215,201)]]};art+=body(d)+line(p(165,217),p(219,213),3,C.ink);caption=phase?'Pedalea de forma continua':'Ajusta el sillín; no bloquees la rodilla';break;}
 case 'elliptical':{
 art+=line(p(85,247),p(282,247),8,C.metal)+dot(p(115,222),23,'#657D72')+dot(p(115,222),12,'#B3C5B4')+line(p(249,241),p(225,105),7,C.metal)+rect(209,91,30,18,4,C.ink)+line(p(206,238),p(215,97),5,C.metal)+line(p(172,238),p(190,96),5,C.metal);
 d={s:p(155,82),h:p(159,155),head:p(157,52),arms:phase?[[p(150,87),p(182,112),p(211,100)],[p(164,88),p(178,116),p(192,101)]]:[[p(150,87),p(169,111),p(190,101)],[p(164,88),p(197,116),p(217,102)]],legs:phase?[[p(151,155),p(154,191),p(122,225)],[p(169,157),p(202,191),p(218,225)]]:[[p(151,155),p(181,190),p(208,225)],[p(169,158),p(153,194),p(136,230)]]};art+=body(d)+rect(113,239,49,7,3,C.ink)+rect(194,235,50,7,3,C.ink);caption=phase?'Alterna sin rebotar':'Tronco erguido; agarre ligero';break;}
 default: return schematicScene('circles',phase,label);
 }
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 285" role="img" aria-label="${caption}" class="exercise-svg"><rect width="340" height="285" rx="22" fill="#F3F6EE"/><circle cx="174" cy="145" r="107" fill="#E6EDDF"/><circle cx="275" cy="49" r="21" fill="#EEF0DD"/><ellipse cx="175" cy="254" rx="125" ry="6" fill="#D6DFD3"/>${art}${label?`<text x="170" y="277" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="600" fill="#3E5B4E">${caption}</text>`:''}</svg>`;
}
