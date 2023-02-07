// Import and register all your controllers from the importmap under controllers/*

import { application } from "controllers/application"

// Eager load all controllers defined in the import map under controllers/**/*_controller
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)

// Lazy load controllers as they appear in the DOM (remember not to preload controllers in import map!)
// import { lazyLoadControllersFrom } from "@hotwired/stimulus-loading"
// lazyLoadControllersFrom("controllers", application)

import "jquery"
import "jquery_ujs"

$(document).ready(function() {
    $.ajax({
        url: "/urls",
        type: "GET",
        success: function(response){
            console.log(response)
            let urls = [];

            for (let i = 0; i < response.urls.length; i++) {
                urls.push(response.urls[i].url);
            }

            $('#url').keypress(function(e) {
                if(e.which == 13) {
                    const url = isValidHttpUrl($(this).val());

                    if (url && !isExisted(urls, url)) {
                        urls.push(url);
                        $(this).val('');
            
                        showList(urls);
                    }
                }
            });

            setInterval(saveUrls, 15000, urls);
        }
    });
});

function saveUrls(urls) {
    $.ajax({
        url: "/urls",
        type: "POST",
        data: {
            url: urls
        },
        success: function(response){
            console.log(response)
        }
    });
}

function isExisted(urls, url) {
    for (let i = 0; i < urls.length; i++) {
        if (url === urls[i]) return true;
    }

    return false;
}

function showList(urls) {
    let content = "";

    for (let i = urls.length - 1; i > -1; i--) {
        content += `<li>${urls[i]}</li>`;
    }

    $('#list_wrap').html(content);
}

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return null;
    }

    return url.protocol === "http:" || url.protocol === "https:" ? url.origin.replace('www.', '') : null;
}