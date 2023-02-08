//  declareren variabelen
        var tellerTotaal = 0
        var tellerTotaalmax = 3
        var tellerbollen = 3
        var tellerkeren = 0
        var totaalprijs = 0
        var tussenprijs = 0
        var oproepzin = ""

        $(document).ready(function(){
            function ToevoegenBollen() {                                                        // margin left wil wel niet werken
                $("div.bollen").append(`                    
                    <li alt="niet" style="list-style-type: none; margin-left: 35px;"><img src="fotos/leeg ijsbol.png" alt="foto2"  ></li>
                    <li alt="niet" style="list-style-type: none; margin-left: 35px;"><img src="fotos/leeg ijsbol.png" alt="foto2"  ></li>
                `);
            }

            $(document).on("click", "div.bollen li", function(){ // als er op de lege ijsbollen geclickt wordt, en de alt attribuut staat gelijk aan niet dan worden de 3 smaken zichtbaar gesteld en de attr op wel gezet
                if ($(this).attr("alt") === "niet")
                {
                    if ($(this).children("img").attr("alt") === "foto2")
                    {
                        $(this).html(`
                        <div class="smaak">
                            <ul aria-placeholder="smaak">
                                <li><img src="fotos/aarbei ijsbol.PNG" alt="aardbei (0.50)" aria-placeholder="foto2"></li>
                                <li><img src="fotos/vanille ijsbol.PNG" alt="vanille (0.50)" aria-placeholder="foto2"></li>
                                <li><img src="fotos/chocolade ijsbol.PNG" alt="chocolade (0.75)" aria-placeholder="foto2"></li>
                            </ul>
                        </div>
                    `)
                    }
                    else
                    {
                        $(this).html(`
                    <div class="smaak">
                        <ul aria-placeholder="smaak">
                            <li><img src="fotos/aarbei ijsbol.PNG" alt="aardbei (0.50)" ></li>
                            <li><img src="fotos/vanille ijsbol.PNG" alt="vanille (0.50)" ></li>
                            <li><img src="fotos/chocolade ijsbol.PNG" alt="chocolade (0.75)" ></li>
                        </ul>
                    </div>
                `)
                    }
                    
                $("div.bollen ul").css("width", "100%");
                $(this).attr("alt", "wel")
                }
            })

            $(document).on("click","div.smaak li img",function(){ // dit heb ik opgesteld zodat mensen ook in de smaken kunnen verwisselen
                if ($(this).parent().parent("ul").attr("aria-placeholder") != "smaak")
                {
                $(oproepzin).html("")
                tellerTotaal -= 1
                }
                $(this).parent().siblings().removeClass("rand")
                $(this).parent().addClass("rand")
                $(this).parent().parent("ul").attr("aria-placeholder", $(this).attr("alt")) // hier wordt de placehouder (smaak) verandert naar de alt van de img (aardbei, chocolade, vanille)
                    if (tellerTotaal < tellerTotaalmax) { // als het totale aantaal ijsjes nog niet bereikt is dan kunnen er nog ijskes toegevoegd worden

                        tellerTotaal += 1
                        oproepzin = "#" + tellerTotaal
                        $(oproepzin).append("bol " + tellerTotaal + ": " +  $(this).attr("alt") + "<br>")
                    } else {
                        alert("je hebt je maximale ijsbollen al bereikt")
                    }
            })
            $(document).on("click",'div.verpakking li',function(){          // deze is ingewikkeld geweest omdat ik hier zit met het toevoegen en verwijderen van 2 bollen
                $(this).siblings().removeClass("rand")
                $(this).toggleClass("rand")

                if ($(this).children().attr("alt") === "coupeXL (2.00)"){   // als we het dus hebben over de coupeXL, dan moeten er 2 bollen toegevoegd
                    tellerTotaalmax = 5
                if (tellerbollen < tellerTotaalmax) {
                    if (tellerkeren === 0) {
                        ToevoegenBollen();                                  // de eerste keer moeten ze natuurlijk toegevoegd worden, maar ...
                        tellerkeren += 1
                        
                    }
                    else
                    {
                        $("div.bollen li img[alt='foto2']").show();         // ... als het al eens aangeklikt is geweest, en ze vooor de zoveelste keer van keuze veranderen dan moet ik ze enkel terug tonee
                       
                    }
                    tellerbollen += 2
                }}
                if ($(this).children().attr("alt") != "coupeXL (2.00)"){    // als de klanten dan van keuze veranderen worden de 2 extra bollen gewoon verborgen
                     tellerTotaalmax = 3
                     $("div.bollen li img[alt='foto2']").hide();
                     tellerbollen -= 2
                    }
                $("#vormx").html("")
                $("#vormx").append("Je hebt gekozen voor de vorm: " + $(this).children().attr("alt"))
                }
            )
            $(document).on("click",'div.sauzen li',function(){ // de twee volgende zijn gelijkaardig en logisch, ik zou ze kunnen samenvoegen maar maak een bewuste keuze om dat niet te doen
                $(this).siblings().removeClass("rand")
                $(this).toggleClass("rand")
                $("#sauzenx").html("")
                $("#sauzenx").append("De saus die je hebt gekozen: " + $(this).children().attr("alt"))
            })
            $(document).on("click",'div.extras li',function(){
                $(this).siblings().removeClass("rand")
                $(this).toggleClass("rand")
                $("#extrasx").html("")
                $("#extrasx").append("Leuke extra! " + $(this).children().attr("alt"))
            })




            $("#Overzicht").on("click", function(){
                $("#rechts").show()
                var naam = $("#naam").val()
                $("#Aanspreking").html("")
                $("#Aanspreking").append("hallo " + naam + ` zie hier een overzicht van je bestelling`)

            })
            $(document).on("click","#Reset", function(){
                tellerTotaalmax = 3
                tellerTotaal = 0
                $("div.smaak ul").attr("aria-placeholder", "smaak")
                $("li").removeClass("rand")
                $("div.bollen li img[alt='foto2']").remove();
                $("div.bollen li img[aria-placeholder='foto2']").remove();
                tellerkeren = 0
                tellerbollen -= 2
                tussenprijs = 0
                totaalprijs = 0
                $("#vormx").html("Je hebt gekozen voor de vorm: ")
                $("#sauzenx").html("De saus die je hebt gekozen: ")
                $("#extrasx").html("Leuke extra!" )
                $("#verzamelingbollen li").html("")
            })

            $("#toonprijs").on("click", function(){ // het volgende is allemaal om de prijs te berekenen
                for (var i = 1; i <= 5; i++) {      // hier is er dus een form, waarbij ik per teller eerst zal controlen of hij wel degelijk aangeklikt is geweest, indien ja wordt er gechecked welke waarde is aangeklikt en op die manier dan prijs vermeerdering toegepast
                var itemId = "#" + i;
                if ($(itemId).html() !== ""){
                    if ($(itemId).html() === "bol " + i + ": " +  "chocolade (0.75)" + "<br>")
                     {
                        tussenprijs += 0.75
                     } else {
                        tussenprijs += 0.50
                     }
                    }
            }
                totaalprijs += tussenprijs
                tussenprijs = 0
                if ($("#vormx").html() != ""){
                    if ($("#vormx").html() === "Je hebt gekozen voor de vorm: " + "coupeXL (2.00)")     // de volgende 3 zijn ook gelijkaardig, en alhoewel ik ze misschien ook zou kunnen samenvoegen maak ik een bewuste keuze om dat niet te doen
                     {
                        totaalprijs += 2.00
                     } else {
                        totaalprijs += 1.00
                     }
                }
                if ($("#sauzenx").html() != ""){
                   if ($("#sauzenx").html() === "De saus die je hebt gekozen: " + "caramelsaus (1.50)")
                     {
                        totaalprijs += 1.50
                     } else {
                        totaalprijs += 1.00
                     }
                }


                if ($("#extrasx").html() !== ""){
                    if ($("#extrasx").html() === "Leuke extra! " + "waaiers (1.00)")
                     {
                        totaalprijs += 1.00
                     } else {
                        totaalprijs += 0.50
                     }
                }

                $("#prijsx").html("")
                $("#prijsx").append("Te betalen: " + totaalprijs + "euro")
                totaalprijs = 0
            })
           
        })
        function bevestigen()
        {
            alert("bedankt voor je bestelling, de wachttijd zal maximaal 5 minuten duren")
        }
        function openingsuren()
        {
            alert('zie hier onze openingsuren' + "\n" + "\n" + "\n" + "maandag - vrijdag : 14-18u" + "\n" + "weekends : 14 - 22u" + "\n" + "\n" + "Wij rijden altijd rond in Zonnebeke"
        
            )
        }