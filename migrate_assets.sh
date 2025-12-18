#!/bin/bash

# Define source and destination
SOURCE_DIR="/Users/kirniy/dev/adapty/src/assets"
PUBLIC_DIR="/Users/kirniy/dev/adapty/public/assets"
DEST_DIR="/Users/kirniy/dev/adapty-pt2/public"

echo "Migrating assets from $SOURCE_DIR to $DEST_DIR..."

# Create destination directories
mkdir -p "$DEST_DIR/fonts"
mkdir -p "$DEST_DIR/icons"
mkdir -p "$DEST_DIR/flags"
mkdir -p "$DEST_DIR/logos"
mkdir -p "$DEST_DIR/images"
mkdir -p "$DEST_DIR/assets"

# Copy Fonts
if [ -d "$SOURCE_DIR/fonts" ]; then
    cp -r "$SOURCE_DIR/fonts/"* "$DEST_DIR/fonts/"
    echo "✅ Fonts copied"
else
    echo "⚠️ Fonts source not found"
fi

# Copy Icons
if [ -d "$SOURCE_DIR/icons" ]; then
    cp -r "$SOURCE_DIR/icons/"* "$DEST_DIR/icons/"
    echo "✅ Icons copied"
else
    echo "⚠️ Icons source not found"
fi

# Copy Logos
if [ -d "$SOURCE_DIR/logos" ]; then
    cp -r "$SOURCE_DIR/logos/"* "$DEST_DIR/logos/"
    echo "✅ Logos copied"
else
    echo "⚠️ Logos source not found"
fi

# Copy Images
if [ -d "$SOURCE_DIR/images" ]; then
    cp -r "$SOURCE_DIR/images/"* "$DEST_DIR/images/"
    echo "✅ Images copied"
else
    echo "⚠️ Images source not found"
fi

# Copy Public Assets
if [ -d "$PUBLIC_DIR" ]; then
    cp -r "$PUBLIC_DIR/"* "$DEST_DIR/assets/"
    echo "✅ Public assets copied"
else
    echo "⚠️ Public assets source not found"
fi

echo "Asset migration complete. Please restart your dev server if needed."
