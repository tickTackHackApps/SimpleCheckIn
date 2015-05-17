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
            var passDataObject = { firstname: null, lastname: null, email: null, appttime: null, referral: null };
            
            $("#start").on( "pagebeforeshow", function( e ) {
                passDataObject.firstname = null;
                passDataObject.lastname = null;
                passDataObject.email = null;
                passDataObject.appttime = null;
                passDataObject.referral = null;
                console.log("loading start page");

            }); 
                
        	$("#step1").on( "pagecreate", function( e ) {
            	console.log('triggered pagecreate step1');
                $(this).find('.next').unbind('click').click(function(e) {
                	$("#name_keyboard").hide();
                    e.preventDefault();
                    passDataObject.firstname = $("#firstname").val();
                    passDataObject.lastname = $("#lastname").val();
                    $.mobile.changePage('#step2', { transition: 'flip'} );					
                });
            });

            $("#step2").on( "pagecreate", function( e ) {
            	console.log('triggered pagecreate step2');
                $(this).find('.next').unbind('click').click(function(e) {
                    e.preventDefault();
                    passDataObject.email = $("#email").val();
                    $.mobile.changePage('#datepicker', { transition: 'flip'} );
                    
                });
                
            });
            
            $("#datepicker").on( "pagecreate", function( e ) {
            	console.log('triggered pagecreate datepicker');
                $(this).find('.next').unbind('click').click(function(e) {
                    e.preventDefault();
                    
                    if($('#radio-noappt').is(':checked')) { 
                    	passDataObject.appttime = "Walk-in";
                    }
                    else { passDataObject.appttime = $("#apptTime").val(); }
                    $.mobile.changePage('#step3', { transition: 'flip'} );
                    
                });
                
            });            
            $("#step3").on( "pagecreate", function( e ) {
                $(this).find('.next').unbind('click').click(function(e) {
                    e.preventDefault();
                    $("input[id*=radio-referral-]:checked").each(function() {
        				passDataObject.referral=$(this).val();
   					 });
                    $.mobile.changePage('#done', { transition: 'flip'} );
                });
            });

            $(document).on( "pagebeforeshow", "#done", function( e ) {
                $("#output").html("Input values are: " + [passDataObject.firstname, passDataObject.lastname, passDataObject.email, passDataObject.appttime, passDataObject.referral]
                	.join(", "));
            });    
            
            $("#done").on( "pagecreate", function( e ) {
				setTimeout(
				  function() { window.location.replace("index.html"); }, 
				  30000
				);
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
