

$(document).ready(function () {
    var connection = new signalR.HubConnectionBuilder().withUrl("/voteHub").build();
    connection.start();
    $(document).on("click", "#voteButton", function () {
        $(this).addClass("disable-voteBtn");
        $(this).attr("disabled", "disabled");
        
        $(".progress").show();
        var chekcedRadioBtnText = $("input[type=radio]:checked").next("div").text();
        $("input[type=radio]:checked").parent().addClass("selected-option ");
       
        connection.invoke("SendVote", chekcedRadioBtnText).catch(function (err) {
            return console.error(err.toString());
        });
    })
    connection.on("ReceiveVote", function (values) {
        var totalVoteCount = 0;
        var percent = 0;
        values.forEach(function (item) {
            totalVoteCount += item.value;
           
        });
       
        values.forEach(function (item) {
            percent = (item.value) / totalVoteCount * 100;
            
            $(`.progress-bar[data-groupname=${item.key}]`).text(`${Math.round(percent)}%`);
            if (parseInt($(`.progress-bar[data-groupname=${item.key}]`).text()) > 0) {

                $(`.progress-bar[data-groupname=${item.key}]`).css({
                    "width": `${Math.round(percent)}%`
                })
            }
            else {
                $(`.progress-bar[data-groupname=${item.key}]`).css({
                    "width": `${0}`
                })
            }
        });
    })  
})

