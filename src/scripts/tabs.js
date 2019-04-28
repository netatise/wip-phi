import config from './config';
import templates from './templates';

(function($) {

    //===========Variables================/

    // Variable for data placeholder
    let tabData = {
            tabs: [],
            contacts: {}
        },
        $section = $('body').find('section'),
        $main = $section.find('main'),
        $header = $section.find('header');

    //===========Functions================/

    let getContactsList = function() {

            $.ajax({
                type: 'GET',
                url: config.userUrl,
                dataType: "json",
                contentType: 'application/json',
                success: function(response) {

                    //Module Data
                    createContactsList(response.results);
                    //Create Tabs
                    $main.append(templates.tabs(tabData.tabs));
                    //Show first tab results;
                    $('.tab:first').click();

                },
                error: function(error) {
                    // Handle Error Here.
                }
            });

            setTimeout(function() {}, 2000)
        },

        // create alphabhet ordered object for storing of contact list.
        createEmptyContacts = function() {

            for (let i in config.tabs) {

                // storing contact details.
                tabData.contacts[config.tabs[i]] = [];
                //storing tab data (tab name and length)
                tabData.tabs[config.tabs[i]] = 0;
            }
        },

        // Modulate Data to the format that needs to be shown on the page.
        createContactsList = function(raw) {

            for (let record of raw) {

                let alphabetGroup = record.name.first.charAt(0).toUpperCase();

                if (tabData.contacts[alphabetGroup]) {

                    tabData.contacts[alphabetGroup].push({
                        first_name: record.name.first,
                        last_name: record.name.last,
                        username: record.login.username,
                        email: record.email,
                        phone: record.phone,
                        location: record.location,
                        picture: record.picture.large
                    });

                    //Sort Based on Last Name
                    tabData.contacts[alphabetGroup].sort((a, b) => (a.last_name > b.last_name) ? 1 : -1);
                    //Store Length of each array to show on the tab.
                    tabData.tabs[alphabetGroup] = tabData.contacts[alphabetGroup].length;
                }

            };
        };

    //===========Handling of Click Functions================/
    //Tab Switch Logic
    $main.on('click', '.tab', function($event) {


        let $tabContent = $main.find('#tab-content');

        $tabContent.empty()
            .append(templates.namesList(tabData.contacts[$(this).data('tabId')]));

        $(".tab").removeClass("active-tab");
        $(this).addClass("active-tab");
    });

    // Open Contact Card
    $main.on('click', '.contact-name__link', function($event) {

        $('.contact-card').hide();

        $(this).toggleClass('active')
            .siblings('.contact-card')
            .toggle();

    });

    // Close Contact Hard
    $main.on('click', '.close-contact-card', function($event) {

        $(this).closest('.contact-card').hide();

    });

    //===============INIT APPLICATION===============/

    // Append Title to the Page.
    $header.append(config.title);

    //Create a alphabetical object having arrays.
    createEmptyContacts();
    //Get contact details and store into the data object.
    getContactsList()


}(jQuery));