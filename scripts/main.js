var before = document.getElementById('before')
var command = document.getElementById("input");
var textarea = document.getElementById("textbox");
var terminal = document.getElementById("terminal");
var git = 0
var commands = []

setTimeout(() => {
    printLines(banner, "", 80);
    textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
    if (e.keyCode == 181) {
        document.location.reload(true);
    }
    if (e.keyCode == 13) {
        commands.push(command.innerHTML);
        git = commands.length;
        addLine("Lesan's Portfolio:~$ " + command.innerHTML, "no-animation", 0);
        router(command.innerHTML.toLowerCase());
        command.innerHTML = "";
        textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
        git -= 1;
        textarea.value = commands[git];
        command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
        git += 1;
        if (commands[git] === undefined) {
            textarea.value = "";
        } else {
            textarea.value = commands[git];
        }
        command.innerHTML = textarea.value;
    }
}

function router(cmd) {

    if (cmd.startsWith("weather")) {
        const parts = cmd.split(" ");
        const location = parts.length > 1 ? parts.slice(1).join(" ") : "auto_ip";
        addLine(`Fetching weather info for ${location}...`, "color2", 0);
        getWeather(location);
        return;
    }

    switch (cmd.toLowerCase()) {
        case cmd.startsWith("encode") ? cmd : null:
            {
                const input = cmd.slice(7).trim(); // Remove "encode " from input
                if (!input) {
                    addLine("Please provide a string to encode.", "error", 0);
                } else {
                    try {
                        const encoded = btoa(input);
                        addLine(`Base64 encoded: <span class="color2">${encoded}</span>`, "color2", 0);
                    } catch (e) {
                        addLine("Encoding failed. Invalid input.", "error", 0);
                    }
                }
                break;
            }

        case cmd.startsWith("decode") ? cmd : null:
            {
                const input = cmd.slice(7).trim(); // Remove "decode " from input
                if (!input) {
                    addLine("Please provide a Base64 string to decode.", "error", 0);
                } else {
                    try {
                        const decoded = atob(input);
                        addLine(`Decoded string: <span class="color2">${decoded}</span>`, "color2", 0);
                    } catch (e) {
                        addLine("Decoding failed. Invalid Base64 string.", "error", 0);
                    }
                }
                break;
            }

        case "help":
            printLines(help, "color2 margin", 80);
            break;

        case "about":
            printLines(about, "color2 margin", 80)
            break;

        case "social":
            printLines(social, "color2 margin", 80)
            break;

        case "projects":
            printLines(projects, "color2 margin", 80)
            break;

        case "experience":
            printLines(experience, "color2 margin", 80)
            break;

        case "banner":
            printLines(banner, "", 80)
            break;

        case "history":
            addLine("<br>", "", 0);
            printLines(commands, "color2", 80);
            addLine("<br>", "command", 80 * commands.length + 50);
            break;

        case "email":
            addLine('Opening mailto:<a href="mailto:lesanabbas@gmail.com">lesanabbas@gmail.com</a>...', "color2", 80);
            openNewTab(email);
            break;

        case "clear":
        case "cls":
            setTimeout(() => {
                terminal.innerHTML = '<a id="before"></a>';
                before = document.getElementById("before");
            }, 1);
            printLines(banner, "", 80)
            break;

        case "linkedin":
            addLine("Opening LinkedIn...", "color2", 0);
            openNewTab(linkedin);
            break;

        case "github":
            addLine("Opening Github...", "color2", 0);
            openNewTab(github);
            break;
        
        case "portfolio":
            addLine("Opening portfolio...", "color2", 0);
            openNewTab(portfolio);
            break;

        case "weather":
            addLine("Fetching weather info for your location...", "color2", 0);
            getWeather("auto_ip"); // uses IP geolocation
            break;

        case "weather <city>":
            const city = cmd.split(" ")[1]; // crude way to get city name
            addLine(`Fetching weather info for ${city}...`, "color2", 0);
            getWeather(city);
            break;

        case "ls":
            addLine("So you are a real programmer at heart ❤️. PS. It's just a website!<br>", "color2", 0);
            break;

        case "cd":
            addLine("So you are a real programmer at heart ❤️. PS. It's just a website!<br>", "color2", 0);
            break;

        case "sudo":
            addLine("Woah Woah Woah!! Relax!!<br>", "color2", 0);
            break;

        case "exit":
            window.close();
            addLine("If the window doesn't close, it might be because of a safety feature! Close the tab manually!", "color2", 0);
            break;

        default:
            addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
            break;
    }
}

function printLines(name, style, time) {
    name.forEach((item, index) => {
        addLine(item, style, index * time);
    })
}

function addLine(text, style, time) {

    var t = "";
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
            t += "&nbsp;&nbsp;";
            i++;
        } else {
            t += text.charAt(i);
        }
    }

    setTimeout(() => {
        var next = document.createElement("p");
        next.innerHTML = t;
        next.className = style;

        before.parentNode.insertBefore(next, before);

        window.scrollTo(0, document.body.offsetHeight);
    }, time);
}

function openNewTab(link) {
    setTimeout(() => {
        window.open(link, "_blank");
    }, 500);
}

function getWeather(location) {
    fetch(`https://wttr.in/${location}?format=3`)
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.text();
        })
        .then(data => {
            addLine(data, "color2", 500);
        })
        .catch(error => {
            addLine("Sorry, couldn't fetch weather data.", "error", 500);
            console.error(error);
        });
}
