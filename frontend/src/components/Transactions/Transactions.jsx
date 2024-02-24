import { useRecoilState, useSetRecoilState } from "recoil";
import Income from "../in-ex/incomes";
import Expenses from "../in-ex/expenses";
import { SelectForm } from "../../Atom/selection";

export default function Transactions(){
    const [selectForm, setSelectForm] = useRecoilState(SelectForm)
    let selectedComponent;
    
    switch (selectForm) {
        case 1:
          selectedComponent = <Income />;
          break;
        case 2:
          selectedComponent = <Expenses />;
          break;
    }

    return(
        <>
            <div className="flex justify-center gap-4 m-2">
                <button className="border shadow-md rounded-xl p-2 bg-green-600 text-white hover:bg-black "
                onClick={() => setSelectForm(1)}>
                    Incomes
                </button>
                <button className="border shadow-md rounded-xl p-2 bg-green-600 text-white hover:bg-black"
                onClick={() => setSelectForm(2)}>
                    Expenses
                </button>
            </div>
            <div className="flex justify-center">
                {selectedComponent}
            </div>
        </>
    )
}