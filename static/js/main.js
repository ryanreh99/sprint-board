const _ = require("lodash");

const MIN_TWO_COLUMN_WIDTH = 992;

function render_display_task(task) {
    if ($(window).width() >= MIN_TWO_COLUMN_WIDTH) {
        let height =
            document.scrollingElement.scrollTop - $("#task_rows").offset().top;
        height = Math.max(0, height + $(".navbar").outerHeight() + 5);
        $("#display_task").css("padding-top", `${height}px`);
    }

    let src = "https://mdbootstrap.com/img/Photos/Others/photo8.jpg";
    if (task.image_hash) src = `task_images/${task.id}/${task.image_hash}`;

    $("#display_task_title").text(task.title);
    $("#display_task_text").text(task.description);
    $("#display_task_info").text(
        `$${task.pay} per hour, within ${task.days} days.`
    );
    $("#display_task_time").text(`Created at: ${task.create_date}`);
    $("#display_task_creator").text(`By: ${task.creator}`);
    $("#display_task_image").attr("src", src);

    $("#display_task").show();
}

function get_error_text(data) {
    if (!data.TNC) {
        return "Please accept Terms and Conditions.";
    }
    if (!data.title || data.title.length === 0) {
        return "Title cannot be empty!";
    }
    return undefined;
}

function display_error_text(error_text) {
    const error_block = $("#form_failed");
    const error_region = error_block.find("p");

    error_region.html("Failed!! Try again.");
    error_region.append($("<p></p>").text(error_text));
    error_block.show();
    setTimeout(() => {
        error_block.fadeOut("slow");
    }, 25000);
}

function initalize() {
    $("body").on("click", ".row", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const task_id = $(e.target).closest(".task_elem").attr("data-task-id");
        if (!task_id) return;

        $.ajax({
            type: "GET",
            url: "tasks/" + task_id,
            success: render_display_task,
            error: () => {
                $("#display_task").hide();
            },
            dataType: "json",
        });
    });

    $("#create_task").on("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const title = $("#create_task .title").val();
        const pay = Number.parseInt($("#create_task .pay").val(), 10);
        const days = Number.parseInt($("#create_task .days").val(), 10);
        const description = $("#create_task .description").val();
        const image = $("#create_task .image_upload").prop("files")[0];
        const TNC = $("#create_task #terms").prop("checked");
        const data = { title, pay, days, description, image, TNC };

        const error_text = get_error_text(data);
        if (error_text) {
            display_error_text(error_text);
            return;
        }

        const success = () => {
            window.location.href = "../";
        };
        const error = (data) => {
            display_error_text(data.responseText);
        };

        const form_data = new FormData();
        _.forOwn(data, (value, key) => {
            form_data.append(key, data[key]);
        });

        $.ajax({
            type: "POST",
            url: "create",
            data: form_data,
            success,
            error,
            processData: false,
            contentType: false,
        });
    });
}
initalize();
