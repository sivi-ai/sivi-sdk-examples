import React, { useState, useEffect } from 'react';
import './FormComponents.css';
import {
  TextInput,
  TextAreaInput,
  NumberInput,
  SelectInput,
  MultiSelectList,
  ColorInput,
  DynamicList,
  UrlInput
} from './FormComponents';
import { designTypes, getSubtypesForType, getDimensionsForSubtype, requiresCustomDimensions } from '../data/designTypes';

const DesignForm = ({ onSubmit, initialData }) => {
  const defaultFormData = {
    type: 'displayAds',
    subtype: 'displayAds-half-page-ad',
    dimension: {
      width: 300,
      height: 600
    },
    prompt: '',
    assets: {
      images: [],
      logos: []
    },
    colors: [],
    fonts: [],
    language: 'english',
    numOfVariants: 4,
    outputFormat: ['jpg']
  };

  const [formData, setFormData] = useState(initialData || defaultFormData);

  // Update form data when initialData changes (for history loading)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Update dimensions when type/subtype changes
  useEffect(() => {
    if (!requiresCustomDimensions(formData.type, formData.subtype)) {
      const dimensions = getDimensionsForSubtype(formData.type, formData.subtype);
      if (dimensions && dimensions.width && dimensions.height) {
        setFormData(prev => ({
          ...prev,
          dimension: {
            width: dimensions.width,
            height: dimensions.height
          }
        }));
      }
    }
  }, [formData.type, formData.subtype]);

  const updateField = (path, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return newData;
    });
  };

  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, '#bb3df5']
    }));
  };

  const updateColor = (index, color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.map((c, i) => i === index ? color : c)
    }));
  };

  const removeColor = (index) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const renderImageItem = (image, onChange) => (
    <div className="asset-item">
      <UrlInput
        label="Image URL"
        value={image.url || ''}
        onChange={(url) => onChange({ ...image, url })}
        placeholder="https://example.com/image.jpg"
      />
      <div className="image-preferences">
        <div className="checkbox-item">
          <input
            type="checkbox"
            checked={image.imagePreference?.crop || false}
            onChange={(e) => onChange({
              ...image,
              imagePreference: {
                ...image.imagePreference,
                crop: e.target.checked
              }
            })}
          />
          <label>Crop</label>
        </div>
        <div className="checkbox-item">
          <input
            type="checkbox"
            checked={image.imagePreference?.removeBg || false}
            onChange={(e) => onChange({
              ...image,
              imagePreference: {
                ...image.imagePreference,
                removeBg: e.target.checked
              }
            })}
          />
          <label>Remove Background</label>
        </div>
      </div>
    </div>
  );

  const renderLogoItem = (logo, onChange) => (
    <div className="asset-item">
      <UrlInput
        label="Logo URL"
        value={logo.url || ''}
        onChange={(url) => onChange({ ...logo, url })}
        placeholder="https://example.com/logo.png"
      />
      {/* <MultiSelectList
        label="Logo Styles"
        values={logo.logoStyles || []}
        onChange={(styles) => onChange({ ...logo, logoStyles: styles })}
        options={[
          { value: 'direct', label: 'Direct' },
          { value: 'outline', label: 'Outline' },
          { value: 'shadow', label: 'Shadow' },
          { value: 'embossed', label: 'Embossed' }
        ]}
      /> */}
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="design-form">
      <SelectInput
        label="Type"
        value={formData.type}
        onChange={(value) => updateField('type', value)}
        options={Object.entries(designTypes).map(([key, type]) => ({
          value: key,
          label: type.label
        }))}
      />

      <SelectInput
        label="Subtype"
        value={formData.subtype}
        onChange={(value) => updateField('subtype', value)}
        options={Object.entries(getSubtypesForType(formData.type)).map(([key, subtype]) => ({
          value: key,
          label: subtype.label
        }))}
      />

      {requiresCustomDimensions(formData.type, formData.subtype) && (
        <div className="dimension-group">
          <NumberInput
            label="Width"
            value={formData.dimension.width}
            onChange={(value) => updateField('dimension.width', value)}
            min={1}
            max={2000}
          />
          <NumberInput
            label="Height"
            value={formData.dimension.height}
            onChange={(value) => updateField('dimension.height', value)}
            min={1}
            max={2000}
          />
        </div>
      )}

      <TextAreaInput
        label="Prompt"
        value={formData.prompt}
        onChange={(value) => updateField('prompt', value)}
        placeholder="Describe your design requirements..."
        rows={6}
      />

      <DynamicList
        label="Images"
        items={formData.assets.images}
        onChange={(images) => updateField('assets.images', images)}
        renderItem={renderImageItem}
        addButtonText="Add Image"
      />

      <DynamicList
        label="Logos"
        items={formData.assets.logos}
        onChange={(logos) => updateField('assets.logos', logos)}
        renderItem={renderLogoItem}
        addButtonText="Add Logo"
      />

      <div className="colors-section">
        <label className="form-label">Colors</label>
        <div className="colors-list">
          <button type="button" onClick={addColor} className="add-color-button">
            Add Color
          </button>
          {formData.colors.map((color, index) => (
            <div key={index} className="color-item">
              <ColorInput
                value={color}
                onChange={(newColor) => updateColor(index, newColor)}
              />
              {formData.colors.length > 0 && (
                <button
                  type="button"
                  onClick={() => removeColor(index)}
                  className="remove-color-button"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

      </div>

      <SelectInput
        label="Language"
        value={formData.language}
        onChange={(value) => updateField('language', value)}
        options={[
          { value: 'english', label: 'English' },
          { value: 'spanish', label: 'Spanish' },
          { value: 'french', label: 'French' },
          { value: 'german', label: 'German' }
        ]}
      />

      <NumberInput
        label="Number of Variants"
        value={formData.numOfVariants}
        onChange={(value) => updateField('numOfVariants', value)}
        min={1}
        max={10}
      />

      {/* <MultiSelectList
        label="Output Format"
        values={formData.outputFormat}
        onChange={(formats) => updateField('outputFormat', formats)}
        options={[
          { value: 'jpg', label: 'JPG' },
          { value: 'png', label: 'PNG' },
        ]}
      /> */}

      <button type="submit" className="ai-studio-button">
        Generate Design
      </button>
    </form>
  );
};

export default DesignForm;
