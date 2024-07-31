document.addEventListener("DOMContentLoaded", function () {
    let step = 0;

    const nextBtn = document.getElementById("signup_next_btn");
    const usernameInput = document.getElementById("id_username");
    const emailInput = document.getElementById("id_email");
    const passwordInput = document.getElementById("id_password1");
    const confirmPasswordInput = document.getElementById("id_password2");
    const showPasswordContainer = document.getElementById("showPasswordContainer");
    const stepInfo = document.getElementById("step_info");
    const spinner = document.getElementById("signup_spinner");
    const form = document.getElementById("id_form");
    const steps = [usernameInput, emailInput, passwordInput, confirmPasswordInput];

    function updateStepInfo() {
        stepInfo.textContent = `Step ${step + 1} of 4`;
    }

    function updateButtons() {
        nextBtn.disabled = steps[step].value === "";
        showPasswordContainer.style.display = step === 2 || step === 3 ? "block" : "none";
    }

    function showStep(step) {
        steps.forEach((input, index) => {
            input.closest(".step").style.display = index === step ? "block" : "none";
        });
        updateStepInfo();
        updateButtons();
    }

    function validateField(input) {
        return input.value.trim() !== "";
    }

    function validateStep(step) {
        if (step === 2 || step === 3) {
            return validateField(passwordInput) && validateField(confirmPasswordInput) && passwordInput.value === confirmPasswordInput.value;
        } else {
            return validateField(steps[step]);
        }
    }

    nextBtn.addEventListener("click", () => {
        if (validateStep(step)) {
            if (step < steps.length - 1) {
                step++;
                showStep(step);
            } else {
                spinner.style.display = "block";
                form.submit();
            }
        } else {
            alert("Please fill in the required field(s) correctly before continuing.");
        }
    });

    steps.forEach((input, index) => {
        input.addEventListener("input", () => {
            if (validateStep(step)) {
                nextBtn.disabled = false;
            } else {
                nextBtn.disabled = true;
            }
        });
    });

    // Initial setup
    showStep(step);
    updateStepInfo();
});
