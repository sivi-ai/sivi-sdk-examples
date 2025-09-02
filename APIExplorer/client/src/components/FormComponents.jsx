import React from 'react';

// Text input component
export const TextInput = ({ label, value, onChange, placeholder, type = "text" }) => {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-input"
      />
    </div>
  );
};

// Number input component
export const NumberInput = ({ label, value, onChange, placeholder, min, max }) => {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
        min={min}
        max={max}
        className="form-input"
      />
    </div>
  );
};

// Select dropdown component
export const SelectInput = ({ label, value, onChange, options, placeholder }) => {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-select"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Multi-select list component
export const MultiSelectList = ({ label, values, onChange, options }) => {
  const handleToggle = (value) => {
    const newValues = values.includes(value)
      ? values.filter(v => v !== value)
      : [...values, value];
    onChange(newValues);
  };

  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <div className="multi-select-list">
        {options.map((option, index) => (
          <div key={index} className="checkbox-item">
            <input
              type="checkbox"
              id={`${label}-${index}`}
              checked={values.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              className="checkbox-input"
            />
            <label htmlFor={`${label}-${index}`} className="checkbox-label">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

// Color picker component
export const ColorInput = ({ label, value, onChange }) => {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <div className="color-input-wrapper">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="color-input"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="color-text-input"
        />
      </div>
    </div>
  );
};

// Dynamic list component for arrays
export const DynamicList = ({ label, items, onChange, renderItem, addButtonText = "Add Item" }) => {
  const addItem = () => {
    onChange([...items, {}]);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, newItem) => {
    const newItems = [...items];
    newItems[index] = newItem;
    onChange(newItems);
  };

  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <div className="dynamic-list">
        {items.map((item, index) => (
          <div key={index} className="dynamic-list-item">
            {renderItem(item, (newItem) => updateItem(index, newItem))}
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="remove-button"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="add-button"
        >
          {addButtonText}
        </button>
      </div>
    </div>
  );
};

// Textarea input component
export const TextAreaInput = ({ label, value, onChange, placeholder, rows = 4 }) => {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="form-textarea"
      />
    </div>
  );
};

// URL input with preview
export const UrlInput = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-input"
      />
      {value && (
        <div className="url-preview">
          <img src={value} alt="Preview" className="url-preview-image" />
        </div>
      )}
    </div>
  );
};
