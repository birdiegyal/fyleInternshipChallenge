const taxCalculatorForm = document.getElementById("tax-calculator-form")
let afterTaxes

const afterTaxesElem = document.getElementById("afterTaxes")
const dialog = document.querySelector("dialog")
const closeDialog = document.getElementById("close-dialog")


taxCalculatorForm.addEventListener("submit", (e) => {
    e.preventDefault() //stop event propagation.


    afterTaxesElem.innerText = calcIncomeAfterTaxes()
    dialog.showModal()
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