
        var TuoteImg = document.getElementById("TuoteImg");
        var Pienikuva = document.getElementsByClassName("pienikuva");

            Pienikuva[0].onclick = function()
            {
                TuoteImg.src = Pienikuva[0].src;
            }
            Pienikuva[1].onclick = function()
            {
                TuoteImg.src = Pienikuva[1].src;
            }
