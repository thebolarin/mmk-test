import Account from '../database/models/account';
import PhoneNumber from '../database/models/phoneNumber';
import { CustomValidator } from "express-validator";

//export const checkIfOrderExists: CustomValidator = async(value) => {
//     return Order.findOne({ where: { order_id: value } }).then(order => {
//       if (order !== null) {
//         return Promise.reject('The order record with this id has already been created');
//       }
//     });
// };

// export const checkIfLedgerExists: CustomValidator = value => {
//     return Ledger.findOne({ where: { ledger_id: value } }).then(ledger => {
//       if (ledger !== null) {
//         return Promise.reject('The ledger record with this id has already been created');
//       }
//     });
// };

// export const checkIfLedgerOrderRecordExists: CustomValidator = value => {
//   return Order.findOne({ where: { order_id: value.order_ticket_schedule.order_id } }).then(order => {
//     if (order == null) {
//       return Promise.reject('The order record for the ledger does not exist');
//     }
//   });
// };