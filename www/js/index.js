/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        $.navigate.init();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        // wait for device is ready
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
        // Listen for the menubutton event to hide/show the menu
    	document.addEventListener("menubutton", this.onMenuKeyDown, false);
    	
    	// Navigate pages
    	this.transitionPages();
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    onMenuKeyDown: function() {
            	alert("menu key pressed");
    /*--    if (menuDiv.style.display != 'none') {
            menuDiv.style.display = 'none';
        } else {
            menuDiv.style.display = 'block';
        }
        var parentElement = document.getElementById('navpanel');
        if (parentElement.style.display != 'none') {
            parentElement.style.display = 'none';
        } else {
            parentElement.style.display = 'block';
        } - */
       $('#navpanel').panel('open');
    },
    transitionPages: function() {
            var passDataObject = { fname: null, email: null, referral: null };

            $(document).on( "pageinit", "#step1", function( e ) {
                $(this).find('a').unbind('click').click(function(e) {
                    e.preventDefault();
                    passDataObject.fname = $("#fname").val();
                    $.mobile.changePage('#step2', { transition: 'flip'} );
                });
            });
            $(document).on( "pageinit", "#step2", function( e ) {
                $(this).find('a').unbind('click').click(function(e) {
                    e.preventDefault();
                    passDataObject.email = $("#email").val();
                    $.mobile.changePage('#step3', { transition: 'flip'} );
                });
            });
            $(document).on( "pageinit", "#step3", function( e ) {
                $(this).find('a').unbind('click').click(function(e) {
                    e.preventDefault();
                    passDataObject.referral= $("#referral").val();
                    $.mobile.changePage('#done', { transition: 'flip'} );
                });
            });

            $(document).on( "pagebeforeshow", "#done", function( e ) {
                $("#output").html(["Selected id is: ", passDataObject.fname, passDataObject.email, passDataObject.referral]
                	.join(", "));
            });    	
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
       	// Options menu
		var onSettings = function() {
		    console.log("eclipse:: clicked Settings menu option");
			$.mobile.changePage('#settings',{
		        	transition: 'slide'
		    	});
		};

	    var optionsmenu = new OptionsMenu({
	        id: "optionsmenu",
	        items: [ 
	            [ {
	                label: "Settings",
	                image: "img/drawable-hdpi/ic_dialog_info.png",
	                action: onSettings
	            } ]
	        ]
	    });
    }
};
