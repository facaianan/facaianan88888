let buttons = [
    { "id": "btn1",  "text": "kinstu��Ѻ",               "url": "https://kintsu.xyz/staking" },
    { "id": "btn2",  "text": "talentum����ƽ̨",        "url": "https://monad.talentum.id/" },
    { "id": "btn3",  "text": "Apriori��Ѻ",            "url": "https://stake.apr.io/" },
    { "id": "btn4",  "text": "nad fun meme����",       "url": "https://testnet.nad.fun/" },
    { "id": "btn5",  "text": "Bebop�佻��һ�Զ���һ", "url": "https://bebop.xyz/trade?network=monad&sell=MON&buy=WMON" },
    { "id": "btn6",  "text": "Monad����",              "url": "https://app.nad.domains/" },
    { "id": "btn7",  "text": "Owlto�����Լ",           "url": "https://owlto.finance/deploy/" },
    { "id": "btn8",  "text": "uniswap������������",     "url": "https://app.uniswap.org/swap" },
    { "id": "btn9",  "text": "Orbiter����",            "url": "https://testnet.orbiter.finance/en?src_chain=11155111&tgt_chain=10143&src_token=ETH" },
    { "id": "btn10", "text": "Curvance���",            "url": "https://app.curvance.com/" },
    { "id": "btn11", "text": "Ambient����",            "url": "https://monad.ambient.finance/" },
    { "id": "btn12", "text": "Accountable��Ϸ",        "url": "https://game.accountable.capital/" },
    { "id": "btn13", "text": "Nostra���",             "url": "https://monad.nostra.finance/" },
    { "id": "btn14", "text": "Fantasy����",            "url": "https://monad.fantasy.top/" },
    { "id": "btn15", "text": "AicraftͶƱ",           "url": "https://aicraft.fun/projects/fizen" },
    { "id": "btn16", "text": "kuru����",               "url": "https://www.kuru.io/swap" },
    { "id": "btn17", "text": "kizzy����",              "url": "https://testnet.kizzy.io/" },
    { "id": "btn18", "text": "Bima���",               "url": "https://bima.money/" },
    { "id": "btn19", "text": "bean����",               "url": "https://swap.bean.exchange/" },
    { "id": "btn20", "text": "blazpay����AI����������", "url": "https://www.defi.blazpay.com/" },
    { "id": "btn21", "text": "Caddy����",              "url": "https://caddy.finance/" },
    { "id": "btn22", "text": "Izumi�����������ڿ�",    "url": "https://alpha.izumi.finance/trade/swap" },
    { "id": "btn23", "text": "Magma��Ѻ",              "url": "https://www.magmastaking.xyz/" },
    { "id": "btn24", "text": "Monorail�ܽ���",         "url": "https://monorail.xyz/" },
    { "id": "btn25", "text": "Multipli ��Testnet����", "url": "https://multipli.fi/" },
    { "id": "btn26", "text": "monadata.aiδ����������", "url": "https://monadata.ai/" },
    { "id": "btn27", "text": "RareBetSports����",      "url": "https://rarelink.rarebetsports.io/" },
    { "id": "btn28", "text": "Magic����NFT�ͽ���",    "url": "https://magiceden.io/monad-testnet" },
    { "id": "btn29", "text": "fortytwoδ��������",    "url": "https://fortytwo.network" },
    { "id": "btn30", "text": "fortytwo��д��",       "url": "https://tally.so/r/wQzVQk" },
    { "id": "btn31", "text": "LFJ.gg �һ�����LP",      "url": "https://pandaria.lfj.gg/" },
    { "id": "btn32", "text": "PancakeSwap����",        "url": "https://pancakeswap.finance/?chain=monadTestnet" },
    { "id": "btn33", "text": "LootGO�Ӱ�����",         "url": "https://www.lootgo.app/" },
    { "id": "btn34", "text": "hashflow����",           "url": "https://app.hashflow.com/?b=1-ETH&q=1-WETH" },
    { "id": "btn35", "text": "castoraδ��������",      "url": "https://castora.xyz/" },
    { "id": "btn36", "text": "levr������",             "url": "https://a4p.levr.bet" }
];

const savedButtons = JSON.parse(localStorage.getItem('customButtons') || '[]');
if (savedButtons.length > 0) {
    buttons = savedButtons;
}

let displayedButtons = [];
let nextId = buttons.length ? Math.max(...buttons.map(b => parseInt(b.id.replace('btn', '')))) + 1 : 1;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderButtons() {
    const container = document.getElementById('container');
    const clickedStates = {};
    Array.from(container.children).forEach(child => {
        if (child.classList.contains('clicked')) {
            clickedStates[child.dataset.id] = true;
        }
    });

    container.innerHTML = '';
    displayedButtons.forEach(btn => {
        const div = document.createElement('div');
        div.className = 'text-btn';
        div.innerText = btn.text;
        div.dataset.id = btn.id;
        div.onclick = function() {
            if (!div.classList.contains('clicked')) {
                window.open(btn.url, '_blank');
                div.classList.add('clicked');
            }
        };
        div.oncontextmenu = function(e) {
            e.preventDefault();
            showEditModal(btn.id);
        };
        if (clickedStates[btn.id]) {
            div.classList.add('clicked');
        }
        container.appendChild(div);
    });
}

function showAddModal() {
    document.getElementById('modal-title').innerText = '��Ӱ�ť';
    document.getElementById('edit-text').value = '';
    document.getElementById('edit-url').value = '';
    document.getElementById('delete-btn').style.display = 'none';
    document.getElementById('edit-modal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('edit-modal').dataset.id = '';
}

function showEditModal(id) {
    const btn = displayedButtons.find(b => b.id === id);
    document.getElementById('modal-title').innerText = '�༭��ť';
    document.getElementById('edit-text').value = btn.text;
    document.getElementById('edit-url').value = btn.url;
    document.getElementById('delete-btn').style.display = 'inline';
    document.getElementById('edit-modal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('edit-modal').dataset.id = id;
}

function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function saveButton() {
    const text = document.getElementById('edit-text').value;
    const url = document.getElementById('edit-url').value;
    if (!text || text.length > 20) {
        alert("���ֲ���Ϊ���Ҳ��ܳ���20���֣�");
        return;
    }
    if (!url || !url.startsWith('http')) {
        alert("��������Ч����ַ��");
        return;
    }
    const id = document.getElementById('edit-modal').dataset.id;
    const newButton = { id: id || `btn${nextId++}`, text, url };
    if (!id) {
        buttons.push(newButton);
        displayedButtons.push(newButton);
    } else {
        const index = buttons.findIndex(b => b.id === id);
        buttons[index] = newButton;
        const displayIndex = displayedButtons.findIndex(b => b.id === id);
        displayedButtons[displayIndex] = newButton;
    }
    localStorage.setItem('customButtons', JSON.stringify(buttons));
    renderButtons();
    closeModal();
}

function deleteButton() {
    const id = document.getElementById('edit-modal').dataset.id;
    if (id) {
        buttons = buttons.filter(btn => btn.id !== id);
        displayedButtons = displayedButtons.filter(btn => btn.id !== id);
        localStorage.setItem('customButtons', JSON.stringify(buttons));
        renderButtons();
    }
    closeModal();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add-btn').addEventListener('click', showAddModal);
    document.getElementById('save-btn').addEventListener('click', saveButton);
    document.getElementById('delete-btn').addEventListener('click', deleteButton);
    document.getElementById('cancel-btn').addEventListener('click', closeModal);
    displayedButtons = shuffle([...buttons]);
    renderButtons();
});