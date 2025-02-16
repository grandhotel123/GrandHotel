// Copyright (c) 2025, Whether you're handling reservations, guest check-ins, housekeeping, or billing, this app provides an all-in-one platform to ensure smooth and efficient management. Designed for hotels, resorts, and vacation rentals, it’s your go-to tool for delivering exceptional guest experiences. and contributors
// For license information, please see license.txt

frappe.ui.form.on("Consolidated Invoices", {
    refresh(frm) {
        if (!frm.is_new())
        {
            if (frm.doc.consolidate_invoices && frm.doc.consolidate_invoices.length > 0)
            {
                let final_amount = 0;
                frm.doc.consolidate_invoices.forEach(element => {
                    final_amount += element.amount;
                    
                });
                frm.set_value("total", final_amount);
                frm.refresh_field("total");
                frm.save();
            }
        }

	},
});
