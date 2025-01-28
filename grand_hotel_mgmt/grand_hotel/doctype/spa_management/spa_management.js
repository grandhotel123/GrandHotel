// Copyright (c) 2025, Whether you're handling reservations, guest check-ins, housekeeping, or billing, this app provides an all-in-one platform to ensure smooth and efficient management. Designed for hotels, resorts, and vacation rentals, it’s your go-to tool for delivering exceptional guest experiences. and contributors
// For license information, please see license.txt

frappe.ui.form.on("Spa Management", {
    refresh(frm) {
        if (frm.doc.docstatus === 1)
        {
            frm.add_custom_button("Create Invoice", () => {
                frappe.new_doc("Sales Invoice", {
                    customer: frm.doc.customer, 
                    items: frm.doc.items, 
                    is_pos: 1,
                });
            });
            
        }

	},
});
