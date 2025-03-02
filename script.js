let buttons = [
    { "id": "btn1",  "text": "kinstu质押",               "url": "https://kintsu.xyz/staking" },
    { "id": "btn2",  "text": "talentum任务平台",        "url": "https://monad.talentum.id/" },
    { "id": "btn3",  "text": "Apriori质押",            "url": "https://stake.apr.io/" },
    { "id": "btn4",  "text": "nad fun meme交互",       "url": "https://testnet.nad.fun/" },
    { "id": "btn5",  "text": "Bebop蜂交易一对多多对一", "url": "https://bebop.xyz/trade?network=monad&sell=MON&buy=WMON" },
    { "id": "btn6",  "text": "Monad域名",              "url": "https://app.nad.domains/" },
    { "id": "btn7",  "text": "Owlto部署合约",           "url": "https://owlto.finance/deploy/" },
    { "id": "btn8",  "text": "uniswap交互和流动性",     "url": "https://app.uniswap.org/swap" },
    { "id": "btn9",  "text": "Orbiter跨链",            "url": "https://testnet.orbiter.finance/en?src_chain=11155111&tgt_chain=10143&src_token=ETH" },
    { "id": "btn10", "text": "Curvance借贷",            "url": "https://app.curvance.com/" },
    { "id": "btn11", "text": "Ambient交易",            "url": "https://monad.ambient.finance/" },
    { "id": "btn12", "text": "Accountable游戏",        "url": "https://game.accountable.capital/" },
    { "id": "btn13", "text": "Nostra借贷",             "url": "https://monad.nostra.finance/" },
    { "id": "btn14", "text": "Fantasy卡牌",            "url": "https://monad.fantasy.top/" },
    { "id": "btn15", "text": "Aicraft投票",           "url": "https://aicraft.fun/projects/fizen" },
    { "id": "btn16", "text": "kuru交互",               "url": "https://www.kuru.io/swap" },
    { "id": "btn17", "text": "kizzy交互",              "url": "https://testnet.kizzy.io/" },
    { "id": "btn18", "text": "Bima借贷",               "url": "https://bima.money/" },
    { "id": "btn19", "text": "bean交互",               "url": "https://swap.bean.exchange/" },
    { "id": "btn20", "text": "blazpay交互AI聊天流动性", "url": "https://www.defi.blazpay.com/" },
    { "id": "btn21", "text": "Caddy交互",              "url": "https://caddy.finance/" },
    { "id": "btn22", "text": "Izumi交互流动性挖矿",    "url": "https://alpha.izumi.finance/trade/swap" },
    { "id": "btn23", "text": "Magma质押",              "url": "https://www.magmastaking.xyz/" },
    { "id": "btn24", "text": "Monorail周交易",         "url": "https://monorail.xyz/" },
    { "id": "btn25", "text": "Multipli 跨Testnet交互", "url": "https://multipli.fi/" },
    { "id": "btn26", "text": "monadata.ai未出可以留意", "url": "https://monadata.ai/" },
    { "id": "btn27", "text": "RareBetSports交互",      "url": "https://rarelink.rarebetsports.io/" },
    { "id": "btn28", "text": "Magic创建NFT和交易",    "url": "https://magiceden.io/monad-testnet" },
    { "id": "btn29", "text": "fortytwo未发布留意",    "url": "https://fortytwo.network" },
    { "id": "btn30", "text": "fortytwo填写表单",       "url": "https://tally.so/r/wQzVQk" },
    { "id": "btn31", "text": "LFJ.gg 兑换和组LP",      "url": "https://pandaria.lfj.gg/" },
    { "id": "btn32", "text": "PancakeSwap交互",        "url": "https://pancakeswap.finance/?chain=monadTestnet" },
    { "id": "btn33", "text": "LootGO加白名单",         "url": "https://www.lootgo.app/" },
    { "id": "btn34", "text": "hashflow交互",           "url": "https://app.hashflow.com/?b=1-ETH&q=1-WETH" },
    { "id": "btn35", "text": "castora未发布留意",      "url": "https://castora.xyz/" },
    { "id": "btn36", "text": "levr待发布",             "url": "https://a4p.levr.bet" }
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
    document.getElementById('modal-title').innerText = '添加按钮';
    document.getElementById('edit-text').value = '';
    document.getElementById('edit-url').value = '';
    document.getElementById('delete-btn').style.display = 'none';
    document.getElementById('edit-modal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('edit-modal').dataset.id = '';
}

function showEditModal(id) {
    const btn = displayedButtons.find(b => b.id === id);
    document.getElementById('modal-title').innerText = '编辑按钮';
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
        alert("文字不能为空且不能超过20个字！");
        return;
    }
    if (!url || !url.startsWith('http')) {
        alert("请输入有效的网址！");
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