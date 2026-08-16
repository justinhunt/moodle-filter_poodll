// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Opens the Chargebee checkout for a Poodll free trial, from the user's own Moodle site.
 *
 * The Chargebee script is only fetched when the user asks for the trial, so the instructions on
 * the page are not immediately buried under a popup.
 *
 * @module     filter_poodll/cbfreetrial
 * @copyright  2026 Justin Hunt (poodllsupport@gmail.com)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import * as Str from 'core/str';
import Notification from 'core/notification';

const CHARGEBEE_JS = 'https://js.chargebee.com/v2/chargebee.js';

/** @var {Promise|null} the in flight or completed load of the Chargebee library. */
let scriptpromise = null;

/** @var {Object|null} the Chargebee instance, which may only be initialised once. */
let cbinstance = null;

/**
 * Fetch the Chargebee library, once.
 *
 * @return {Promise}
 */
const loadchargebee = () => {
    if (scriptpromise === null) {
        scriptpromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CHARGEBEE_JS;
            script.onload = resolve;
            script.onerror = () => {
                // Allow a later click to try again.
                scriptpromise = null;
                reject(new Error('Could not load ' + CHARGEBEE_JS));
            };
            document.head.appendChild(script);
        });
    }
    return scriptpromise;
};

/**
 * Show the "check your email" instructions.
 */
const showaftercheckout = () => {
    const aftercheckout = document.querySelector('[data-region="cbaftercheckout"]');
    if (aftercheckout) {
        aftercheckout.classList.remove('d-none');
        aftercheckout.scrollIntoView({behavior: 'smooth', block: 'nearest'});
    }
};

/**
 * Set up the Chargebee cart and open the checkout.
 *
 * @param {Object} opts
 */
const opencheckout = (opts) => {
    if (cbinstance === null) {
        cbinstance = window.Chargebee.init({site: opts.site, isItemsModel: true});
        if (typeof cbinstance.setCheckoutCallbacks === 'function') {
            cbinstance.setCheckoutCallbacks(() => {
                return {
                    success: showaftercheckout,
                };
            });
        }
    }

    const cart = cbinstance.getCart();
    const product = cbinstance.initializeProduct(opts.priceid, 1);
    cart.replaceProduct(product);
    cart.setCustomer({
        email: opts.email,
        billing_address: {
            first_name: opts.firstname,
            last_name: opts.lastname,
            country: opts.country,
        },
    });
    // The site URL we want registered against the new subscription.
    product.setCustomData({cf_startsiteurl: opts.wwwroot});
    cart.proceedToCheckout();
};

export const init = (opts) => {
    const button = document.querySelector('[data-action="cbstarttrial"]');
    if (!button) {
        return;
    }
    button.addEventListener('click', () => {
        button.disabled = true;
        loadchargebee()
            .then(() => {
                opencheckout(opts);
                button.disabled = false;
                return true;
            })
            .catch((error) => {
                button.disabled = false;
                window.console.error(error);
                Str.get_string('cbtrialfailed', 'filter_poodll')
                    .then((message) => {
                        Notification.alert('', message);
                        return true;
                    })
                    .catch(Notification.exception);
                return false;
            });
    });
};
