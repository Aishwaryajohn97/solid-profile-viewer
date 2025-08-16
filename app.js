const DEFAULT_WEBID = 'https://timbl.solidcommunity.net/profile/card#me';
const store = $rdf.graph();
const fetcher = new $rdf.Fetcher(store);

const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');

const avatarEl = document.getElementById('avatar');
const nameEl = document.getElementById('displayName');
const webidTextEl = document.getElementById('webidText');
const contactsListEl = document.getElementById('contactsList');

async function loadProfile(webid) {
  try {
    // Reset main avatar
    avatarEl.textContent = '';
    avatarEl.style.backgroundImage = '';
    avatarEl.style.backgroundColor = '#3b82f6';

    const subject = $rdf.sym(webid);
    await fetcher.load(subject.doc());

    const nameNode = store.any(subject, FOAF('name')) || store.any(subject, VCARD('fn'));
    const name = nameNode ? nameNode.value : 'Unknown';
    nameEl.textContent = name;

    const imgNode = store.any(subject, FOAF('img')) || store.any(subject, VCARD('hasPhoto'));
    if (imgNode) {
      avatarEl.style.backgroundImage = `url('${imgNode.value}')`;
      avatarEl.style.backgroundSize = 'cover';
      avatarEl.style.backgroundPosition = 'center';
    } else {
      avatarEl.textContent = name[0].toUpperCase();
    }

    webidTextEl.textContent = webid;

    // Contacts
    contactsListEl.innerHTML = '';
    const contacts = store.each(subject, FOAF('knows'));
    if (contacts.length === 0) {
      contactsListEl.innerHTML = '<p class="text-sm text-gray-500">No contacts found.</p>';
    } else {
      contacts.forEach(c => {
        const card = document.createElement('div');
        card.className = 'contact-card fade-in';

        const contactNameNode = store.any(c, FOAF('name')) || store.any(c, VCARD('fn'));
        const contactName = contactNameNode ? contactNameNode.value : null;

        const contactImgNode = store.any(c, FOAF('img')) || store.any(c, VCARD('hasPhoto'));

        const contactAvatar = document.createElement('div');
        contactAvatar.className = 'contact-avatar';

        if (contactImgNode) {
          contactAvatar.style.backgroundImage = `url('${contactImgNode.value}')`;
          contactAvatar.style.backgroundSize = 'cover';
          contactAvatar.style.backgroundPosition = 'center';
        } else {
          // Show generic human icon (SVG)
          contactAvatar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="32" height="32">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
            </svg>
          `;
        }

        const nameText = document.createElement('p');
        nameText.className = 'contact-name';
        nameText.textContent = contactName || c.value;

        card.appendChild(contactAvatar);
        card.appendChild(nameText);

        contactsListEl.appendChild(card);
      });
    }
  } catch (err) {
    console.error(err);
    nameEl.textContent = 'Error loading profile';
    avatarEl.textContent = '?';
    contactsListEl.innerHTML = '<p class="text-sm text-red-500">Unable to load contacts or profile.</p>';
  }
}

document.getElementById('loadBtn').addEventListener('click', () => {
  const inputWebid = document.getElementById('webidInput').value.trim();
  const webid = inputWebid || DEFAULT_WEBID;
  window.location.href = `${window.location.pathname}?webid=${encodeURIComponent(webid)}`;
});

(async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const webid = urlParams.get('webid') || DEFAULT_WEBID;
  document.getElementById('webidInput').value = webid;
  await loadProfile(webid);
})();
