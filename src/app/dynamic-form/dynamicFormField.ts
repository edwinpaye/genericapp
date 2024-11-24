export interface DynamicFormField {
    type: string;       // 'text', 'select', 'radio', etc.
    label: string;      // Field label
    name: string;       // FormControlName
    options?: string[]; // Options for 'select' or 'radio'
}
