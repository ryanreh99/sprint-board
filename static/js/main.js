function initalize () {
    $("body").on("click", ".row", (e) => {
        e.preventDefault();
        e.stopPropagation();
        task_id = $(e.target).closest(".task_elem").attr("data-task-id");
        if (!task_id) {
            return;
        }
        data = {task_id};
        $.ajax({
            type: "GET",
            url: "getTask",
            data,
            success: (d) => {
                height = document.scrollingElement.scrollTop - $("#task_rows").offset().top;
                if (height > 0)
                    $("#display_task").css("padding-top", height + $(".navbar").outerHeight() + 5 + "px");
                else
                $("#display_task").css("padding-top", "0px");

                $("#display_task_title").text(d.title);
                $("#display_task_text").text(d.description);
                $("#display_task_info").text("$"+d.pay+" per hour, within "+d.days+" days.");
                $("#display_task_time").text("Created at: "+d.create_date);
                if (d.image_hash)
                    $("#display_task_image").attr("src", "task_images/" + d.id + "/" + d.image_hash)
                $("#display_task").show();
            },
            error: () => {
            $("#display_task").hide();
            },
            dataType: "json",
        });
    });

    $("#create_task").submit((e) => {
        e.preventDefault();
        e.stopPropagation();

        const form_data = new FormData();

        const title = $("#create_task #title").val();
        const pay = parseInt($("#create_task .pay").val(), 10);
        const days = parseInt($("#create_task .days").val(), 10);
        const description = $("#create_task #description").val();
        const terms = $("#create_task #terms").prop('checked');
        const image = $("#create_task .image_upload");

        let error_text = "";
        if(!terms) {
            error_text = "Please accept terms and conditions."
        }
        if (!title || title.length === 0) {
            error_text = "Title cannot be empty!"
        }

        if (error_text !== "") {
            $("#form_failed p").html(error_text);
            $("#form_failed").show();
            return;
        } else {
            $("#form_failed").hide();
        }

        function success() {
            window.location.href = '../'
        };
        function error() {
            $("#form_failed p").html("Failed!! Try again.");
            $("#form_failed").show();
        };
        const data = {title, pay, days, description, image};
        for (const property in data) {
            form_data.append(property, data[property]);
          }

        $.ajax({
            url: "create",
            type: "POST",
            data:  form_data,
            success,
            error,
            processData: false,
            contentType: false,
        });
    });
}
initalize();