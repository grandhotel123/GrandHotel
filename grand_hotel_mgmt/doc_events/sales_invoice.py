import frappe
from frappe import _

def on_submit(doc, method=None):
    if doc.items and len(doc.items) > 0: 
        first_item = doc.items[0]
        consolidated = frappe.get_all(
            "Consolidated Invoices",
            filters={"customer": doc.customer, "docstatus": 0},
            fields=["name"]
        )

        if consolidated:
            consolidated_doc = frappe.get_doc("Consolidated Invoices", consolidated[0].name)
        else:
            consolidated_doc = frappe.new_doc("Consolidated Invoices")
            consolidated_doc.customer = doc.customer
            consolidated_doc.customer_name = doc.customer_name

        consolidated_doc.append("consolidate_invoices", {  
            "reference_doctype": first_item.reference_dt,   
            "reference_id": first_item.reference_dn, 
            "sales_invoice": doc.name,
            "amount": doc.rounded_total
        })

        consolidated_doc.save(ignore_permissions=True)


