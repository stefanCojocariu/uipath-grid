# Stage 1: Build the Angular app
FROM node:22 AS builder

WORKDIR /app

# Install dependencies
COPY . .
RUN npm install

# Copy app source code
# COPY . .

# Build the Angular app for production
RUN npm run build -- --configuration=production

# Stage 2: Serve the app with NGINX
FROM nginx:alpine

# Copy built app from builder stage (note the leading slash here)
COPY --from=builder /app/dist/uipath-grid/browser /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
