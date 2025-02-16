// Copyright (c) 2025, Whether you're handling reservations, guest check-ins, housekeeping, or billing, this app provides an all-in-one platform to ensure smooth and efficient management. Designed for hotels, resorts, and vacation rentals, it’s your go-to tool for delivering exceptional guest experiences. and contributors
// For license information, please see license.txt

frappe.ui.form.on("Room Reservation", {
    refresh(frm) {
        if (frm.doc.docstatus === 1) {
            frm.add_custom_button("Make Invoice", () => {
                frappe.new_doc("Sales Invoice", {
                    customer: frm.doc.customer,
                    is_pos: 1,
                    update_stock: 0,
                    naming_series:"ACC-SINV-RET-.YYYY.-",
                    items: frm.doc.items.map(item => ({
                        item_code: item.item_code,
                        qty: item.qty,
                        rate: item.rate,
                        amount: item.amount,
                        reference_dt: frm.doc.doctype,  
                        reference_dn: frm.doc.name  
                    }))
                });
            });
        }
    },
    validate: function (frm)
    {
        if (frm.doc.items && frm.doc.items.length > 0)
        {
            let amount = 0;
            frm.doc.items.forEach(element => {
                
                amount += element.rate;
                
            });
            frm.set_value("net_total",amount);
            frm.refresh_field("net_total");
        }   
    }
    
});
frappe.ui.form.on("Room Reservation Entries", {
    qty: function (frm, cdt, cdn) {
        
        let row = locals[cdt][cdn];
        if (row.qty) {
            let final_rate = row.qty * row.rate;
            frappe.model.set_value(cdt, cdn, "rate", final_rate);
            frm.refresh_field("room_reservation_entries");
        }
        else if (row.qty === 0)
        {
            frm.refresh_field("room_reservation_entries");
            frappe.model.set_value(cdt, cdn, "qty", 1);
            frappe.throw(__("You cannot make qty zero"));
            
        }
    }
});
