const taxCalculatorForm = document.getElementById("tax-calculator-form")
const afterTaxesElem = document.getElementById("afterTaxes")
const dialog = document.querySelector("dialog")
const closeDialog = document.getElementById("close-dialog")
let afterTaxes

taxCalculatorForm.addEventListener("submit", (e) => {
    e.preventDefault() //stop event propagation.

    const invalidFields = validateForm()
    if (invalidFields.length) {
        notifyError(invalidFields)
    } else {
        afterTaxesElem.innerText = calcIncomeAfterTaxes()
        dialog.showModal()
    }
})

closeDialog.addEventListener("click", (e) => {
    e.preventDefault()
    dialog.close()
})


function calcIncomeAfterTaxes() {
    const formdata = new FormData(taxCalculatorForm)
    const ageGrp = formdata.get("ageGrp")
    let isTaxable = false
    let taxPercentage
    try {
        const GAI = parseFloat(formdata.get("grossAnnualIncome"))
        const EI = parseFloat(formdata.get("extraIncome"))
        const Deduc = parseFloat(formdata.get("totalApplicableDeduc"))
        const OI = GAI + EI - Deduc

        if (OI > 8e5) {
            isTaxable = true
        }

        if (isTaxable) {
            switch (ageGrp) {
                case "<40":
                    taxPercentage = 30 / 100
                    break;

                case ">= 40 and <60":
                    taxPercentage = 40 / 100
                    break;

                case ">=60":
                    taxPercentage = 10 / 100
                    break;

            }
        }

        const totalTax = taxPercentage * (OI - 8e5)
        afterTaxes = OI - totalTax

        return afterTaxes

    } catch (error) {
        console.log(error)
    }
}

// this func returns a array of invalid fields.
function validateForm() {
    const formdata = new FormData(taxCalculatorForm)
    Array.from(formdata.keys()).map((fieldname) => fieldname !== "ageGrp" && (document.getElementById(fieldname).nextElementSibling.style.visibility = "hidden"))
    return Array.from(formdata.keys()).filter((fieldname) => fieldname !== "ageGrp" && (!formdata.get(fieldname) || isNaN(Number(formdata.get(fieldname)))))
}

// this function highlight the invalid fields. 
function notifyError(fields) {
    fields.forEach((field) => {
        field = document.getElementById(field).nextElementSibling
        field.style.visibility = "visible"
    })
}