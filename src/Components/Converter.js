import React, { useEffect, useState } from "react";
import { Card, Form, Input, Select } from "antd";
import { RiCoinsLine } from "react-icons/ri"
function Converter() {

    const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";
    const defaultFirstSelectValue = "Bitcoin"
    const defaultSecondSelectValue = "Ether"

    const [cryptoList, setCryptoList] = useState([]);
    const [inputValue, setInputValue] = useState(0);
    const [firstSelect, setfirstSelect] = useState(defaultFirstSelectValue)
    const [secondSelect, setSecondSelect] = useState(defaultSecondSelectValue)
    const [result, setResult] = useState(0)

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const response = await fetch(apiUrl)
        const jsonData = await response.json()
        const data = jsonData.rates
        const tempArray = Object.entries(data).map(item => {
            return {
                value: item[1].name,
                label: item[1].name,
                rate: item[1].value
            }
        })

        setCryptoList(tempArray)

    }

    useEffect(() => {
        if (cryptoList.lenght === 0) return;

        try {
            const firstSelectRate = cryptoList.find((item) => {
                return item.value === firstSelect
            }).rate;
            const secondSelectRate = cryptoList.find((item) => {
                return item.value === secondSelect
            }).rate

            const resultValue = (inputValue * firstSelectRate) / secondSelectRate
            setResult(resultValue)
        }
        catch (e) {
            console.log(e);
        }
    }, [inputValue, firstSelect, secondSelect])

    return (
        <div className="container">
            <Card title={<h1 style={{ textAlign: "center" }}> <RiCoinsLine /> Crypto-Converter</h1>} className="crypto-cards">
                <Form>
                    <Form.Item>
                        <Input onChange={(event) => setInputValue(event.target.value)} />
                    </Form.Item>
                </Form>
                <div className="select-box">
                    <Select style={{ width: "160px" }} className="layout" defaultValue={defaultFirstSelectValue} onChange={(value) => setfirstSelect(value)} options={cryptoList} />
                    <Select style={{ width: "160px" }} className="layout" defaultValue={defaultSecondSelectValue} onChange={(value) => setSecondSelect(value)} options={cryptoList} />
                </div>
                <p style={{ color: "white", fontSize: "1.27vw", fontWeight: "530", textAlign: "center" }}> {inputValue} {firstSelect} = {result.toFixed(6)} {secondSelect}</p>
            </Card>
        </div>
    )
}





export default Converter


