let cookieCount = 0;
let moneyCount = 0;
let clickPower = 1;
let upgrades = {
    cursor: { cost: 15, multiplier: 1 },
    grandma: { cost: 100, multiplier: 2 },
    farm: { cost: 1100, multiplier: 3 }
};
let addons = {
    'Extra Upgrades Pack Pt1': { cost: 100, upgrades: ['Factory', 'Mine', 'Shipment', 'Alchemy Lab'] },
    'Black Background': { cost: 0 }
};

document.getElementById('cookieButton').addEventListener('click', () => {
    cookieCount += clickPower;
    document.getElementById('cookieCount').innerText = cookieCount;
});

document.getElementById('upgradeButton').addEventListener('click', () => {
    let upgradeMenu = document.getElementById('upgradeMenu');
    upgradeMenu.style.display = upgradeMenu.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('addonButton').addEventListener('click', () => {
    let addonMenu = document.getElementById('addonMenu');
    addonMenu.style.display = addonMenu.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('moneyButton').addEventListener('click', () => {
    if (cookieCount >= 1000) {
        cookieCount -= 1000;
        moneyCount += 10;
        document.getElementById('cookieCount').innerText = cookieCount;
        document.getElementById('moneyCount').innerText = moneyCount;
    } else {
        alert('Not enough cookies!');
    }
});

document.getElementById('adminLoginButton').addEventListener('click', () => {
    let username = prompt('Enter username:');
    let password = prompt('Enter password:');
    if (username === 'toxic' && password === '1212') {
        alert('Admin logged in!');
        document.getElementById('adminLoginButton').style.display = 'none';
        document.querySelector('.mod-menu').style.display = 'block';
    } else {
        alert('Invalid credentials!');
    }
});

document.getElementById('setCookiesButton').addEventListener('click', () => {
    let newCookieCount = parseInt(document.getElementById('setCookies').value);
    if (!isNaN(newCookieCount)) {
        cookieCount = newCookieCount;
        document.getElementById('cookieCount').innerText = cookieCount;
    }
});

document.getElementById('setMoneyButton').addEventListener('click', () => {
    let newMoneyCount = parseInt(document.getElementById('setMoney').value);
    if (!isNaN(newMoneyCount)) {
        moneyCount = newMoneyCount;
        document.getElementById('moneyCount').innerText = moneyCount;
    }
});

function buyUpgrade(upgradeName) {
    if (cookieCount >= upgrades[upgradeName].cost) {
        cookieCount -= upgrades[upgradeName].cost;
        clickPower += upgrades[upgradeName].multiplier;
        upgrades[upgradeName].cost = Math.floor(upgrades[upgradeName].cost * 1.15);
        document.getElementById('cookieCount').innerText = cookieCount;
        updateUpgradeMenu();
    } else {
        alert('Not enough cookies!');
    }
}

function buyAddon(addonName) {
    if (moneyCount >= addons[addonName].cost) {
        moneyCount -= addons[addonName].cost;
        document.getElementById('moneyCount').innerText = moneyCount;
        if (addonName === 'Black Background') {
            document.body.classList.toggle('dark-mode');
        } else {
            alert(`Installing ${addonName}... Please wait 20 seconds.`);
            setTimeout(() => {
                alert(`${addonName} installed!`);
                addons[addonName].upgrades.forEach(upgrade => {
                    upgrades[upgrade.toLowerCase()] = { cost: 5000, multiplier: 5 };
                });
                updateUpgradeMenu();
            }, 20000);
        }
    } else {
        alert('Not enough money!');
    }
}

function updateUpgradeMenu() {
    let upgradeMenu = document.getElementById('upgradeMenu');
    upgradeMenu.innerHTML = '';
    for (let upgrade in upgrades) {
        let button = document.createElement('button');
        button.innerText = `${upgrade.charAt(0).toUpperCase() + upgrade.slice(1)} (Cost: ${upgrades[upgrade].cost})`;
        button.onclick = () => buyUpgrade(upgrade);
        upgradeMenu.appendChild(button);
    }
}

function updateAddonMenu() {
    let addonMenu = document.getElementById('addonMenu');
    addonMenu.innerHTML = '';
    for (let addon in addons) {
        let button = document.createElement('button');
        button.innerText = `${addon} (Cost: $${addons[addon].cost})`;
        button.onclick = () => buyAddon(addon);
        addonMenu.appendChild(button);
    }
}

updateUpgradeMenu();
updateAddonMenu();
