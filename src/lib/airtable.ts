import Airtable from 'airtable'
import { Product } from '@/data/products'

// Airtable Configuration
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY!
}).base(process.env.AIRTABLE_BASE_ID!)

// Table Names
export const TABLES = {
  PRODUCTS: 'Products',
  CATEGORIES: 'Categories', 
  SUBCATEGORIES: 'Subcategories',
  NEWS: 'News',
  EVENTS: 'Events'
} as const

// Products API Functions
export const airtableProducts = {
  // Get all products
  async getAll() {
    try {
      const records = await base(TABLES.PRODUCTS).select({
        view: 'Grid view'
      }).all()
      
      return records.map(record => {
        const fields = record.fields as any
        
        // Parse special fields back to their original format
        const parsedFields = { ...fields }
        
        // Convert comma-separated strings back to arrays
        if (fields.features && typeof fields.features === 'string') {
          parsedFields.features = fields.features.split(', ').filter((f: string) => f.trim())
        }
        if (fields.applications && typeof fields.applications === 'string') {
          parsedFields.applications = fields.applications.split(', ').filter((a: string) => a.trim())
        }
        
        // Parse JSON specifications back to object
        if (fields.specifications && typeof fields.specifications === 'string') {
          try {
            parsedFields.specifications = JSON.parse(fields.specifications)
          } catch {
            parsedFields.specifications = {}
          }
        }
        
        // Parse JSON images back to array
        if (fields.images && typeof fields.images === 'string') {
          try {
            parsedFields.images = JSON.parse(fields.images)
          } catch {
            parsedFields.images = []
          }
        }
        
        // Set image field from first image in images array (for thumbnail compatibility)
        if (parsedFields.images && Array.isArray(parsedFields.images) && parsedFields.images.length > 0) {
          parsedFields.image = parsedFields.images[0]
        } else if (!parsedFields.image) {
          // Fallback to default image if no images available
          parsedFields.image = '/images/lab-1.jpg'
        }
        
        return {
          id: record.id,
          ...parsedFields
        }
      }) as Product[]
    } catch (error) {
      console.error('Error fetching products from Airtable:', error)
      throw new Error('Failed to fetch products')
    }
  },

  // Get product by ID
  async getById(id: string) {
    try {
      const record = await base(TABLES.PRODUCTS).find(id)
      const fields = record.fields as any
      
      // Parse special fields back to their original format
      const parsedFields = { ...fields }
      
      // Convert comma-separated strings back to arrays
      if (fields.features && typeof fields.features === 'string') {
        parsedFields.features = fields.features.split(', ').filter((f: string) => f.trim())
      }
      if (fields.applications && typeof fields.applications === 'string') {
        parsedFields.applications = fields.applications.split(', ').filter((a: string) => a.trim())
      }
      
      // Parse JSON specifications back to object
      if (fields.specifications && typeof fields.specifications === 'string') {
        try {
          parsedFields.specifications = JSON.parse(fields.specifications)
        } catch {
          parsedFields.specifications = {}
        }
      }
      
      // Parse JSON images back to array
      if (fields.images && typeof fields.images === 'string') {
        try {
          parsedFields.images = JSON.parse(fields.images)
        } catch {
          parsedFields.images = []
        }
      }
      
      // Set image field from first image in images array (for thumbnail compatibility)
      if (parsedFields.images && Array.isArray(parsedFields.images) && parsedFields.images.length > 0) {
        parsedFields.image = parsedFields.images[0]
      } else if (!parsedFields.image) {
        // Fallback to default image if no images available
        parsedFields.image = '/images/lab-1.jpg'
      }
      
      return {
        id: record.id,
        ...parsedFields
      } as Product
    } catch (error) {
      console.error('Error fetching product by ID:', error)
      throw new Error('Product not found')
    }
  },

  // Create new product
  async create(productData: any) {
    try {
      const records = await base(TABLES.PRODUCTS).create([{
        fields: productData
      }])
      const record = records[0]
      return {
        id: record.id,
        ...record.fields
      } as Product
    } catch (error) {
      console.error('Error creating product:', error)
      throw new Error('Failed to create product')
    }
  },

  // Update product
  async update(id: string, productData: any) {
    try {
      const records = await base(TABLES.PRODUCTS).update([{id, fields: productData}])
      const record = records[0]
      return {
        id: record.id,
        ...record.fields
      } as Product
    } catch (error) {
      console.error('Error updating product:', error)
      throw new Error('Failed to update product')
    }
  },

  // Delete product
  async delete(id: string) {
    try {
      await base(TABLES.PRODUCTS).destroy(id)
      return { success: true }
    } catch (error) {
      console.error('Error deleting product:', error)
      throw new Error('Failed to delete product')
    }
  }
}

// News API Functions
export const airtableNews = {
  async getAll() {
    try {
      const records = await base(TABLES.NEWS).select({
        view: 'Grid view'
      }).all()
      
      return records.map(record => ({
        id: record.id,
        ...record.fields
      }))
    } catch (error) {
      console.error('Error fetching news from Airtable:', error)
      throw new Error('Failed to fetch news')
    }
  },

  async create(newsData: any) {
    try {
      const records = await base(TABLES.NEWS).create([{
        fields: newsData
      }])
      const record = records[0]
      return {
        id: record.id,
        ...record.fields
      }
    } catch (error) {
      console.error('Error creating news:', error)
      throw new Error('Failed to create news')
    }
  },

  async update(id: string, newsData: any) {
    try {
      const records = await base(TABLES.NEWS).update([{id, fields: newsData}])
      const record = records[0]
      return {
        id: record.id,
        ...record.fields
      }
    } catch (error) {
      console.error('Error updating news:', error)
      throw new Error('Failed to update news')
    }
  },

  async delete(id: string) {
    try {
      await base(TABLES.NEWS).destroy(id)
      return { success: true }
    } catch (error) {
      console.error('Error deleting news:', error)
      throw new Error('Failed to delete news')
    }
  }
}

// Events API Functions
export const airtableEvents = {
  async getAll() {
    try {
      const records = await base(TABLES.EVENTS).select({
        view: 'Grid view'
      }).all()
      
      return records.map(record => ({
        id: record.id,
        ...record.fields
      }))
    } catch (error) {
      console.error('Error fetching events from Airtable:', error)
      throw new Error('Failed to fetch events')
    }
  },

  async create(eventData: any) {
    try {
      const records = await base(TABLES.EVENTS).create([{
        fields: eventData
      }])
      const record = records[0]
      return {
        id: record.id,
        ...record.fields
      }
    } catch (error) {
      console.error('Error creating event:', error)
      throw new Error('Failed to create event')
    }
  }
}

// Categories API Functions
export const airtableCategories = {
  async getAll() {
    try {
      const records = await base(TABLES.CATEGORIES).select({
        view: 'Grid view'
      }).all()
      
      return records.map(record => ({
        id: record.id,
        ...record.fields
      }))
    } catch (error) {
      console.error('Error fetching categories from Airtable:', error)
      throw new Error('Failed to fetch categories')
    }
  }
} 