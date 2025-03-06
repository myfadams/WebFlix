import React, { useState } from 'react'
import styles from "./input.module.css"
function Input({value,setValue,placeHolder, type,name}) {
    const [shouldHide,setShouldHide]=useState(true)
  return (
		<div className={styles.mainIn}>
			<input
				type={type=="password"?(!shouldHide?"text":"password"):type}
				placeholder={placeHolder}
				onChange={(e) => {
					const val = e.target.value;
					setValue({ ...value, [name]: val });
				}}
				value={value[name]}
				required
                // hidden=
			/>
			{(name === "password" || name === "confirmPassword") && (
				<div className={styles.touchableOpacity}
					// style={}
                    onClick={()=>{
                        setShouldHide(!shouldHide)
                    }}
				>
					{!shouldHide ? (
						<img src="./hide.png" alt="" />
					) : (
						<img src="./show.png" alt="" />
					)}
				</div>
			)}
		</div>
	);
}

export default Input
