let templates = {
        tabs: (tabs) => `
        <div id='contacts' class="center">
            <ul id="tabs" class='list'>
                ${Object.keys(tabs).map(tab => `
                <li class='tab pointer ${ tabs[tab] < 1 ? 'disabled' : '' }' data-tab-id="${tab}">
                    <span class="tab-header__sub-text">${tabs[tab]}</span>
                    <span class="tab-header__primrary-text">${tab}</span>
                </li>`).join('')}
            </ul>
            <div id="tab-content">
            </div>
        </div>
        `,
        namesList: (contactsList) => 
        `
        <ul class='contact-names-list list'>
            ${contactsList.map(contact => `
            <li class="contact-names-list-item">
                <div class="contact-name__link capital-text pointer center">
                    <span>${contact.last_name}</span>,
                    <span class="first-name">${contact.first_name}</span>
                </div>
                <div class="contact-card">
                    <i class="close-contact-card pointer pull-right">&times;</i>
                    <div class="contact-card__header">
                        <div class="username">
                            <p>USERNAME</p>
                            <p>${contact.username}</p>
                        </div>
                        <div class="contact-image pull-left">
                            <img src="${contact.picture}" />
                        </div>
                        <p class="contact-name pull-left">
                            <span class="first-name">${contact.first_name}</span>, 
                            <span>${contact.last_name}</span>
                        </p>
                    </div>
                    <div class="contact-card__details">
                        <p>
                            <div class="label">e-mail</div>
                            <span class="value">${contact.email}</span>
                        </p>
                        <p>
                            <div class="label">phone</div>
                            <span class="value">${contact.phone}</span>
                        </p>
                        <p>
                            <div class="label">street</div>
                            <span class="value">${contact.location.street}</span>
                        </p>
                        <p>
                            <div class="label">city</div>
                            <span class="value">${contact.location.city}</span>
                        </p>
                        <p>
                            <div class="label">state</div>
                            <span class="value">${contact.location.state}</span>
                        </p>
                        <p>
                            <div class="label">postcode</div>
                            <span class="value">${contact.location.postcode}</span>
                        </p>
                    </div>
                </div>
            </li>`).join('')}
        </ul>
        `,

};

export default templates;